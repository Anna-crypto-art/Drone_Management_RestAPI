import Vue from 'vue';
export default class AppLogin extends Vue {
  email: string;
  password: string;
  msg: string;
  show: boolean;

  onSubmit(e: Event): Promise<void>;
}