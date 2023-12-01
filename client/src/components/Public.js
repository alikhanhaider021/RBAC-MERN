import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
            <Link to="/login"> Login</Link>
            </header>
            <main className="public__main">
            <h1>Welcome to <span className="nowrap">RBAC!</span></h1>
                <p>Role base access control.</p>
                <br />
            </main>
            <footer>
                
            </footer>
        </section>

    )
    return content
}
export default Public