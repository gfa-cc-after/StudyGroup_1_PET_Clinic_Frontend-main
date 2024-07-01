import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <form method="post">
        <p>Welcome to the Pet Clinic!</p>
        <p>To continue, please do yor registration down below. Thank you for choosing us!</p>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email"></input>
            <br></br>

            <label for="username">Username:</label>
            <input type="text" id="username" name="username"></input>
            <br></br>

            <label for="password">Password:</label>
            <input type="text" id="password" name="password"></input>
            <br></br>
                <button type="submit">Submit</button>

        </form>
      </header>
    </div>
  );
}

export default App;
