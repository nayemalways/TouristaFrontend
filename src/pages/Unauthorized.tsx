import { Link } from 'react-router';

const Unauthorized = () => {
    return (
        <div>
            <h1>You haven't rights to access this page!</h1>
            <Link to='/'>Back to home</Link>
        </div>
    );
};

export default Unauthorized;