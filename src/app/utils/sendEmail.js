import emailjs from "@emailjs/browser";

export const sendEmail = (name, email) => {
  const templateParams = {
    to_name: name,
    to_email: email,
  };

  return emailjs.send(
    "service_9z18wgg",
    "template_wxsf1a2",
    templateParams,
    "XiUcLqOqrY3GatYx_"
  );
};
