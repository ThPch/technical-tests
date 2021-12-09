import React from 'react';

const UsersList = (props) => {
    return (
    <div>
        <ul className="collection">
            <li className="collection-header"><h4>Users fetched from API</h4></li>
            {props.users.map((user) => {
                return <li className="collection-item" key={user._id}>
                <span className="title" key={user._id}><strong>ID : </strong> {user._id}</span>
                <br />
                <p><strong>Email : </strong>{user.email}</p>
                <a className="waves-effect waves-light btn-small" onClick={props.updateCurrentUser.bind(this, user)}> Check profile </a>
                </li>
            })}
        </ul>
    </div> 
    );
}
 
export default UsersList;