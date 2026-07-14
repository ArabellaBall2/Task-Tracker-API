function Header({ loggedIn, onLogout }) {
    return (
        <header>
            <h1>Task Tracker</h1>

            {loggedIn && (
                <button onClick={onLogout}>
                    Logout
                </button>
            )}
        </header>
    );
}

export default Header;