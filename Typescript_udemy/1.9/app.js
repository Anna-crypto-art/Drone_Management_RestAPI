var fields = {
    labelExpl: "blub_labelExpl",
    superAdminOnly: true,
    hidden: true
};
var fields_1 = {
    labelExpl: "blub_labelExpl",
    superAdminOnly: true
};
if (fields.hasOwnProperty('hidden')) {
    console.log('fields has the "hidden" property');
}
else {
    console.log('fields does not have the "hidden" property');
}
if (fields_1.hasOwnProperty('hidden')) {
    console.log('fields_1 has the "hidden" property');
}
else {
    console.log('fields_1 does not have the "hidden" property');
}
