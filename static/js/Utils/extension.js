
export const sendExtensionMessage = (data, cb) => {
  try{
    if (window.chrome) {
      let allExtensionsID = [
        process.env.REACT_APP_EXTENSION_ID,
      //   //'jiadaegmaigflgmcbgfcccfgakaeibdi', //first extension chrome store
      //   //'eanobggagjleffflmjcljamnpgaidpnk', //Den ID  local
      //   //'bgiheckimomkipenpfnddjabmnodkonp', //Den ID  C3
        'jjnheellgockdidbigfmjpnpeooneand', //Kate ID  C3
        'khkdnfdggejfefadgndkpgliimadhhbn', //Kate ID  C3 v2
        'enenikobeopoebnpafhekmnbddakanhb', //Iryna ID  C3
        'fdgdkbjedohdkkmajiphfijafklneodj', //Iryna ID  C3
      //   'efelolkncfliacgibibckoahhbljclpe', //Artem ID  C3,
      //   'nhnhkhkdikkgogeihggfonhamecdemmh', //Artem ID  local,
      //   //'kjekcgeejpkbnncoccjmhhckhcfgdgbl', //Andrii ID  C3,
      //   //'pekknjleldhdejehachojlghcndjjcil', //Josef ID  C3,
      //   //'iiggpgmhldlapneenbbpbpajgafmjllf', //Nawras ID  C3,
      //   //'aakjpnlbdnlilikidkpieikjdhbddpak', //Hlib ID  C3,
      //   //'eogldabpgeeedjjpobalfobengefbfhc', //Hlib ID  C3,
      //   //'ginnbcbcmbijhmfeejmehcpophhpddgk', //Vitalik_T ID  C3,
      ]

      allExtensionsID.forEach( extensionID => sendMessage(extensionID, data, cb))
    }
  }catch (err){
    console.error('Dropship Extension Not Installed yet :(', err);
  }
}

let counter = 0;

const sendMessage = (extensionID, data, cb) => {
  window.chrome.runtime.sendMessage(
    extensionID,
    data,
    function (response) {
      if (data?.action === 'signInSuccess') {
        console.log('sendMessage response', {response, counter})
        counter++;
        // if (!response?.status && counter < 3) setTimeout(() => {
        if (!response?.status && counter < 15) setTimeout(() => {
          sendMessage(extensionID, data, cb);
        }, 400)
      }
      if (cb) cb(response)
    })
}
