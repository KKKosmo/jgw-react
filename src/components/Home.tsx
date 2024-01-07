import React from 'react';

const Home = (props: { user: string }) => {
    console.log(props);
    return (
        <div>
            {props.user ? 'Hi ' + props.user : 'You are not logged in'}
        </div>
    );
};

export default Home;