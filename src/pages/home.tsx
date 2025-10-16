const Home= () => {
    return (
        <div
            role="main"
            aria-labelledby="home-title"
        >
            <header style={{ width: '100%', maxWidth: 960, marginBottom: '2rem' }}>
                <h1 id="home-title" style={{ margin: 0 }}>
                    Welcome to the Home Page
                </h1>
            </header>
 
            <main style={{ width: '100%', maxWidth: 960 }}>
                <p>
                    This is the home page of your application. Replace this content with
                    your actual home UI.
                </p>
            </main>

            <footer
                style={{
                    marginTop: 'auto',
                    width: '100%',
                    maxWidth: 960,
                    paddingTop: '2rem',
                    borderTop: '1px solid #eee',
                }}
            >
                <small>© {new Date().getFullYear()} My App</small>
            </footer>
        </div>
    );
};

export default Home;