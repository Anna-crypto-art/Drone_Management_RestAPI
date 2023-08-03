"""
# user paramters
hidden_dims = [11, 11, ... , 11]  # list of hidden layer dimensions
epochs = 11  # number of epochs
batch_size = 11  # training batch size
learning_rate = 11  # learning rate
cuda = False  # true or false to train the model on cuda or not
plots = True  # true or false to produce plots of train and test losses and accuracies
"""

"""
Steps to do:
1. Get the training data
2. Prepare data loading
3. Define model
4. Define optimization procedure
5. Train model (and evaluate)
"""

"""
### Model training
After all the pieces are ready, we implemen the main training loop. It needs to do the following:
* initiate randomly the linear model parameters $(\mathbf{w}, b)$
* repeat for each epoch (unitl done)
    * load batch of data
    * do linear model precitions with current parameter values
    * calculate loss
    * get gradients
    * update parameter values
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import torch
import torch.nn as nn
from torch.autograd import Variable
import torchvision
import torchvision.transforms as transforms
from torch.utils.data import Dataset, DataLoader

#Dictonary of activation functions
activationDict = {
    "ReLU" : nn.ReLU(),
    "Elu"  : nn.ELU(),
    "tanh" : nn.Tanh(),
    "leakyRelu" : nn.LeakyReLU(),
    "sigmoid"   : nn.Sigmoid()
}


def create_convs(out_channels, activation):
    cnn_list = []
    cnn = nn.Sequential(
        nn.Conv2d(in_channels=1, out_channels=out_channels[0], kernel_size=3, padding=1),
        activationDict[activation],
        nn.MaxPool2d(kernel_size=2, stride=2)
    )
    cnn_list.append(cnn)
    for i in range(1, len(out_channels)):
        cnn = nn.Sequential(
            nn.Conv2d(in_channels=out_channels[i-1] , out_channels=out_channels[i], kernel_size=3, padding=1),
            activationDict[activation],
            nn.MaxPool2d(kernel_size=2, stride=2)
        )
        cnn_list.append(cnn)
    return nn.Sequential(*cnn_list)

def create_linears(out_channels, dropout, hidden_neurons):
    lin_list = []
    lin_list.append(nn.Linear(in_features=int(out_channels[-1] * 28/(len(out_channels)*2) * 28/(len(out_channels)*2)), out_features=hidden_neurons))
    lin_list.append(nn.ReLU())
    if dropout != 0:
        lin_list.append(nn.Dropout(dropout))
    lin_list.append(nn.Linear(in_features=hidden_neurons, out_features=10))
    lin_list.append(nn.Softmax(dim=1))
    return nn.Sequential(*lin_list)


class FashionCNN(nn.Module):
    def __init__(self, output_channels, dropout_rate, activation, hid_neurons):
        super(FashionCNN, self).__init__()
        self.convlayer = create_convs(output_channels, activation)
        self.nn_Sequential = create_linears(output_channels, dropout_rate, hid_neurons)
    def forward(self, x):
        out = self.convlayer(x)
        out = out.view(out.size(0), -1) #similar to reshape in numpy
        out = self.nn_Sequential(out)
        return out



# add a paramater to the function for the model
def cnn_train(
        out_channels, 
        epochs, 
        batch_size, 
        learning_rate, 
        cuda, 
        plots, 
        dropout, 
        activation, 
        hidden_neurons,
        optim, 
        eval_size_batch = 100):
    """
    loads the data, creates the model with given parameters, trains the model

    Parameters:
    hidden_dims:    list of integers, len of list is number of layers and value of element in list is number of neurons in that layer
    epochs:         integer, number of epochs for training
    batch_size:     integer, size of one batch
    learning_rate:  float, learning rate for the optimizer
    cuda:           bool, True = use cuda
    plots:          bool, True = display plots with loss and accuracy
    dropout:        list of floats, len must be len(hidden_dims)-2, values of elements must be between 0 and 1, value is dropout rate per hidden layer
    batchnorm:      bool, True = adding normalization layers, False = no normalization layers
    activation:     list of string, possible activation functions are in activatinoDict, Relu, Elu, tanh, leakyRelu, sigmoid
    optim:          string, name of the opimizer in optimizerDict, Adam, SGD
    eval_size_batch: integer, default 100, number after how many training batches the model will be evaluated

    Return:
    fashion_mlp_model:  mlp model
    loss_list:          list of floats, loss over time of training
    accuracy_list:      list of floats, accuracy over time of training
    """
    # 0. Initializing CUDA 
    device = torch.device("cuda" if torch.cuda.is_available() and cuda == True else "cpu")
    print(device)

    # 1. Get the training data
    all_transforms = transforms.Compose([
        transforms.ToTensor()
    ])
    train_data = torchvision.datasets.FashionMNIST ('fashion_data', train=True, download=True, transform=all_transforms)
    test_data = torchvision.datasets.FashionMNIST ('fashion_data', train=False, transform=all_transforms)
    
    # 2. Prepare data loading
    train_loader = DataLoader(train_data, batch_size=batch_size, shuffle=True)
    test_loader = DataLoader(test_data, batch_size=batch_size, shuffle=True)
    
    # 3. Define model
    fashion_mlp_model = FashionCNN(out_channels, dropout, activation, hidden_neurons).to(device) #this part could be also skipped
    #print(fashion_mlp_model)

    # 4. Define optimization procedure
    error = nn.CrossEntropyLoss() # CHANGE IT HERE WITH DIFFERENT FUNCTIONS TO COMPARE THEM
    
    #Dictonary of Optimizers
    optimizerDict = {
        "Adam": torch.optim.Adam(fashion_mlp_model.parameters(), lr=learning_rate),
        "SGD": torch.optim.SGD(fashion_mlp_model.parameters(), lr=learning_rate)
    }
    optimizer =  optimizerDict[optim]# CHANGE IT HERE WITH DIFFERENT FUNCTIONS TO COMPARE THEM

    # 5. Train model (and evaluate)
    list_losses = []
    list_iterations = []
    list_accuracy = []
    
    pred_list = []
    labels_list = []
    curr_batch = 0 # current batch

    #start of the training
    for epoch in range(epochs):
        print("Epoch {} of {}".format(epoch + 1, epochs))
        for images, labels in train_loader: #iterating through batches
            train = Variable(images).to(device)
            labels = Variable(labels).to(device)
            outputs = fashion_mlp_model(train)
            loss_func = error(outputs, labels)
            optimizer.zero_grad()
            loss_func.backward()
            optimizer.step()
            curr_batch += 1
            if curr_batch % eval_size_batch == 0: #evaluate the model after a given amount of batches
                total_labels = 0
                matches_labels = 0
                for images, labels in test_loader:
                    labels_list.append(labels)
                    images = Variable(images).to(device)
                    outputs = fashion_mlp_model(images)
                    predictions = torch.max(outputs, 1)[1]
                    pred_list.append(predictions)
                    matches_labels += (predictions == labels.to(device)).sum()
                    total_labels += len(labels)
                accuracy = matches_labels / total_labels * 100
                list_iterations.append(curr_batch)
                list_losses.append(loss_func.data.cpu())
                list_accuracy.append(accuracy.cpu())
                print("No of iterations: {}, Calculated Loss: {}, Accuracy: {}".format(curr_batch, loss_func.data, accuracy))

    #Plotting the data
    if plots == False:
        return fashion_mlp_model, list_losses, list_accuracy
    
    fig, (ax1, ax2) = plt.subplots(1,2)
    fig.suptitle("Evaluation of the model")
    ax1.plot(list_iterations, list_losses)
    ax1.set_title("Loss")
    ax1.set_xlabel("Number of iterations")
    ax1.set_ylabel("Loss")
    ax2.plot(list_iterations, list_accuracy)
    ax2.set_title("Accuracy")
    ax2.set_xlabel("Number of iterations")
    ax2.set_ylabel("Accuracy")
    #for saving the figure as png
    #pngName='_'.join(str(e) for e in out_channels)
    #plt.savefig("{}".format(pngName))

    return fashion_mlp_model, list_losses, list_accuracy

def mnist_label(label):
    """
    maps the number of the classes to a string with real name

    Parameters:
    label:  integer, number corresponding to a class

    Return:
    output_mapping: string, name of the class
    """
    output_mapping = {
                 0: "T-shirt/Top",
                 1: "Trouser",
                 2: "Pullover",
                 3: "Dress",
                 4: "Coat",
                 5: "Sandal",
                 6: "Shirt",
                 7: "Sneaker",
                 8: "Bag",
                 9: "Ankle Boot"
                 }
    label = (label.item() if type(label) == torch.Tensor else label)
    return output_mapping[label]

def mlp_apply(subset_indices, mlp_model, cuda):
    """
    feeds the indices from the test set to the trained model and let predict it
    outputs the predictions of the model and display the real images with labels

    Parameters:
    subset_indices:   list of integers, indexes for test images
    mlp_model:        trained mlp model

    Return:
    no return
    """
    #initializing CUDA, if the model has been trained on CUDA
    device = torch.device("cuda" if torch.cuda.is_available() and cuda == True else "cpu")

    #load data from fashionMNIST
    all_transforms = transforms.Compose([
        transforms.ToTensor()
    ])
    test_data = torchvision.datasets.FashionMNIST ('fashion_data', train=False, transform=all_transforms)
    subset = torch.utils.data.Subset(test_data, subset_indices)

    #take the indices from the testset
    testloader_subset = torch.utils.data.DataLoader(subset, batch_size=len(subset_indices), num_workers=0, shuffle=False)
    samples, labels = next(iter(testloader_subset))

    #plot images with labels
    grid = torchvision.utils.make_grid(samples, nrow=10)
    plt.figure(figsize=(15, 20))
    plt.imshow(np.transpose(grid, (1, 2, 0)))

    #let the model predict labels and print them out
    samples_variable = Variable(samples).to(device)
    outputs = mlp_model(samples_variable)
    predictions = torch.max(outputs, 1)[1]

    print("Actual labels   :", [mnist_label(label) + 5*" " for label in labels])
    print("Predicted labels:", [mnist_label(labell) + 5*" " for labell in predictions])
    print("\nVisualisation of the actual labels (images)")

                


