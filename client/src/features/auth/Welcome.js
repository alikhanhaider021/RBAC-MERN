import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'

const Welcome = () => {

    const { username, isManager, isAdmin } = useAuth()

    useTitle(`RBACPosts: ${username}`)

    const content = (
        <section className="welcome">


            <h1>Welcome {username}!</h1>

            <p><Link to="/dash/posts">View Posts</Link></p>

            <p><Link to="/dash/posts/new">Add New Post</Link></p>

            {(isManager || isAdmin) && <p><Link to="/dash/users">View Users</Link></p>}

            {(isManager || isAdmin) && <p><Link to="/dash/users/new">Add New User</Link></p>}

        </section>
    )

    return content
}
export default Welcome