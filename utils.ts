export const URLRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
export const EmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export const SocialUsernameRgex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/i;

export async function getMediaStream(): Promise<MediaStream> {
  return new Promise((resolve, reject) => {
    const getUserMedia =
      navigator.mediaDevices?.getUserMedia || navigator.getUserMedia;

    if (!getUserMedia) {
      reject(new Error("User media unavailable"));
    }

    navigator.getUserMedia(
      {
        video: {
          facingMode: "environment",
        },
      },
      function (stream) {
        resolve(stream);
      },
      function (e) {
        reject(e);
      }
    );
  });
}
