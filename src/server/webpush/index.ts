import webpush from 'web-push';

const gcmServerKey = 'AIzaSyC5itnz9jHmpvQRhq8sJUCFUy2SYUPanGs';
webpush.setGCMAPIKey(gcmServerKey);

const webPushVAPIDKeys = {
    publicKey: 'BGa8_5HX_pzy-WP3WZXzvDxF3A27HoTGFzdxjKJeCzpt75kQaNkmuj6ttUTMyhwOySqmS44lnQ9Wc6Lnsrm78zE',
    privateKey: '9xXVX-adTNaKfG9khc0U8rDfrmEhhbcSZVq9NOuB1zE',
}
webpush.setVapidDetails(
    'mailto:textone@gmail.com',
    webPushVAPIDKeys.publicKey,
    webPushVAPIDKeys.privateKey
);

export default webpush;