import { observable, action, makeObservable, runInAction } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import * as utils from "../utils";

enableStaticRendering(typeof window === "undefined");

export enum EDecodeResultTypes {
  URL,
  Email,
  SocialUsername,
  Unknown,
  Error,
  None,
}

class MainStore {
  loading = true;
  useCameraScan = false;
  modalOpenState = false;
  decodeValue = "";
  decodedResultType: EDecodeResultTypes = EDecodeResultTypes.None;

  constructor() {
    makeObservable(this, {
      loading: observable,
      useCameraScan: observable,
      modalOpenState: observable,
      decodeValue: observable,
      init: action,
      setDecodedValue: action,
      detectValueType: action,
      setModalState: action,
      decodeError: action,
    });

    if (typeof window !== "undefined") {
      this.init();
    }
  }

  decodeError() {
    this.decodedResultType = EDecodeResultTypes.Error;
  }

  setDecodedValue(value: string) {
    this.decodeValue = value;
    this.detectValueType(value);

    this.setModalState(true);
  }

  setModalState(state: boolean) {
    this.modalOpenState = state;
  }

  async init() {
    if (!navigator.mediaDevices?.getUserMedia) return;

    try {
      const [track] = (await utils.getMediaStream()).getVideoTracks();
      if (!(track.enabled && track.readyState === "live")) {
        return;
      }

      runInAction(() => {
        this.useCameraScan = true;
      });

      track.addEventListener("ended", () => {
        runInAction(() => {
          this.useCameraScan = false;
        });
      });
    } catch (e) {}
  }

  detectValueType(value: string) {
    if (utils.URLRegex.test(value)) {
      return (this.decodedResultType = EDecodeResultTypes.URL);
    }

    if (utils.EmailRegex.test(value)) {
      return (this.decodedResultType = EDecodeResultTypes.Email);
    }

    if (utils.SocialUsernameRgex.test(value)) {
      return (this.decodedResultType = EDecodeResultTypes.SocialUsername);
    }

    return EDecodeResultTypes.Unknown;
  }
}

export default new MainStore();
