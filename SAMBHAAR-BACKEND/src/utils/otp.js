// export function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

function otpExpiry(minutes = 5) {
  return Date.now() + minutes * 60 * 1000;
}

module.exports = {otpExpiry};