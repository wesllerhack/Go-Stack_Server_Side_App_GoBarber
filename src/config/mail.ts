interface IMailConfig {
  driver: 'ethereal' | 'sas';
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
}
