export const tweet = () => {
  let text =
    "Heyo this is a test tweet with a twitter bot!  Here's my portfolio shorturl.at/kDFTV";
  Twitter.post("statuses/update", { status: text }, (err, res) => {
    if (!err) {
      console.log(res);
    }
    console.error(err);
  });
};
