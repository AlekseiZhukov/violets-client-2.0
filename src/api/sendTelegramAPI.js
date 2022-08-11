export const telegramApi = {
  async sentOrder(formData) {
    console.log("feedbackFormApi sentMessage");
    try {
      return await fetch(
        "https://api.telegram.org/bot1808311868:AAHC_Zz8Ju5ijZWPCVh5nAzd6Q2b6x-w-Ws/sendMessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: formData,
        }
      );
    } catch (e) {
      return e.message;
    }
  },
};
