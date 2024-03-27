import React from 'react';
import { Link } from 'react-router-dom';

function Page2() {
  return (
    <div>
      <h2>Welcome to Your page 2!!!!!!!!!!!!!!!!</h2>
      <p>This is your page 2 content.</p>
      {/* Link to navigate to Home */}
      <Link to="/Home">Go to Home</Link>
    </div>
  );
}

export default Page2;