function UserCard({ user: { firstName, lastName } }) {
    return (
        <div className='user-card'>
            <img src='https://i.pravatar.cc/150?img=3' alt='user' />
            <div className='user-info'>
                <h2>{firstName} {lastName}</h2>
            </div>
        </div>
    )
}

export default UserCard
