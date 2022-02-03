import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

// Firebase Cloudの処理？
export const setCustomClaims = functions.auth.user().onCreate(async (user) => {
  // hasuraのエンドポイントを認証するための設定。hasura用に追加で指定する
  const customClaims = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-default-role': 'satff', // defaultのユーザーの設定？
      'x-hasura-allowed-roles': ['staff'], // 許可するユーザーの設定？
      'x-hasura-user-id': user.uid, // hasuraのuser_idをFirebaseのuser_idに当てる
    },
  }
  try {
    //カスタムクレームを設定
    await admin.auth().setCustomUserClaims(user.uid, customClaims)
    // カスタムクレームの処理が終わった後に、Reactに教える
    // fireStoreにユーザーのメタ情報を書き込む
    await admin.firestore().collection('user_meta').doc(user.uid).create({
      refreshTime: admin.firestore.FieldValue.serverTimestamp(),
    })
  } catch (e) {
    console.log(e)
  }
})

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
