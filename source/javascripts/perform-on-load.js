export default (callback) => {
  if (document.readyState === 'loading') {  // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', callback);
  } else {  // `DOMContentLoaded` has already fired
    callback();
  }
}

