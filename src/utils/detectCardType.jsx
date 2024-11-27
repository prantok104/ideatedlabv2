import visaIcon from "../../public/asset/card/visa.svg";
import mastercardIcon from "../../public/asset/card/mastercard.svg";
import amexIcon from "../../public/asset/card/amex.svg";
import dinersClubIcon from "../../public/asset/card/dinners.svg";
import discoverIcon from "../../public/asset/card/discover.svg";
import jcbIcon from "../../public/asset/card/jcb.svg";
import unionpayIcon from "../../public/asset/card/unionpay.svg";
import maestroIcon from "../../public/asset/card/maestro.svg";
// import mirIcon from "../../public/asset/card/mir.svg";
// import eloIcon from "../../public/asset/card/elo.svg";
// import hiperIcon from "../../public/asset/card/hiper.svg";
// import hipercardIcon from "../../public/asset/card/hipercard.svg";

const detectCardType = (cardNumber) => {
  const cleanedCardNumber = cardNumber.replace(/\s+/g, ""); // Remove spaces

  switch (true) {
    case /^4[0-9]{12}(?:[0-9]{3})?$/.test(cleanedCardNumber):
      return visaIcon;

    case /^(5[1-5][0-9]{14}|2(2[2-9][0-9]{2}|[3-6][0-9]{3}|7[01][0-9]{2}|720)[0-9]{12})$/.test(
      cleanedCardNumber
    ):
      return mastercardIcon;

    case /^3[47][0-9]{13}$/.test(cleanedCardNumber):
      return amexIcon;

    case /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(cleanedCardNumber):
      return dinersClubIcon;

    case /^6(?:011|5[0-9]{2}|4[4-9][0-9])[0-9]{12}$/.test(cleanedCardNumber):
      return discoverIcon;

    case /^(?:2131|1800|35\d{3})\d{11}$/.test(cleanedCardNumber):
      return jcbIcon;

    case /^(62[0-9]{14,17})$/.test(cleanedCardNumber):
      return unionpayIcon;

    case /^(5018|5020|5038|56|57|58|6304|67|6759|6761|6762|6763)[0-9]{8,15}$/.test(
      cleanedCardNumber
    ):
      return maestroIcon;

    // Uncomment if you want to include these card types
    // case /^220[0-4][0-9]{12}$/.test(cleanedCardNumber):
    //   return <Image src={mirIcon} alt="MIR" width={24} height={16} />;
    // case /^((4011(78|79))|(4312(74|75))|(438935)|(451416)|(4576(31|32))|(5067(0[0-9]|1[0-9]|2[0-9]|3[0-9]))|(506699)|(5090(0[0-9]|1[0-9]|2[0-9]))|(627780)|(636297)|(636368)|(6500(3[1-3]))|(6504(8[4-9]|9[0-9]))|(6505(0[0-3]))|(6507(0[0-1]))|(6507(2[1-9]))|(6509(0[0-9]|1[0-9]|2[0-9]))|(6516(5[2-9]|[7-9][0-9]))|(6550(0[0-9]|1[0-9]|2[0-9])))[0-9]{0,10}$/.test(
    //       cleanedCardNumber
    //     ):
    //       return <Image src={eloIcon} alt="Elo" width={24} height={16} />;
    //     case /^(637095|637568|637599|637609|637612)[0-9]{10}$/.test(
    //       cleanedCardNumber
    //     ):
    //       return <Image src={hiperIcon} alt="Hiper" width={24} height={16} />;
    //     case /^(606282|3841(0[0-9]|[1-9][0-9]))[0-9]{10}$/.test(cleanedCardNumber):
    //       return <Image src={hipercardIcon} alt="Hipercard" width={24} height={16} />;
    default:
      return null; // Return null if no match
  }
};

export default detectCardType;
