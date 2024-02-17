export const make_title = (slug) => {
  var words = slug?.split(/-|_/);
  return words?.map(function (word) {
    return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
  })
    .join(" ");
};


export const sendSignupEmail = async (email) => {
  try {
    const data = new FormData();
    data.append("email", email);
    const response = await fetch("/send-emails/?/sendSignupEmail", {
      method: "POST",
      body: data,
    });
  } catch (error) {
    console.error(error);
  }
};

