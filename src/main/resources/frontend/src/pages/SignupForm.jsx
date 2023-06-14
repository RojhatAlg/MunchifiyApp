import React, { useState } from 'react';

const SignupForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        // Create a user object with the form data
        const user = {
            name,
            email,
            password
        };

        try {
            // Send a POST request to the signup API endpoint
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                // User signup successful
                console.log('User signed up successfully');
                // You can perform additional actions after successful signup, such as navigating to a different page
            } else {
                // User signup failed
                console.log('Failed to sign up user');
                // You can handle the failure case here, such as displaying an error message to the user
            }
        } catch (error) {
            console.log('Error signing up user', error);
            // Handle any errors that occurred during the signup process
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="button" onClick={handleSignup}>Sign Up</button>
            </form>
        </div>
    );
};

export default SignupForm;
