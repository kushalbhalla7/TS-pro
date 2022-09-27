import AppStart from 'src/app';

const app: AppStart = new AppStart();
app
  .dbConnection()
  .then(() => {
    app.listen();
  })
  .catch((error) => {
    console.log(error);
  });
