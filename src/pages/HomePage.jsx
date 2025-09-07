import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
    return (
        <div className="homepage d-flex flex-column justify-content-center align-items-center text-center">
            <div className="overlay"></div>
            <div className="content">
                <h1 className="title">Welcome to ToDo App ✅</h1>
                <p className="subtitle">
                    A simple and powerful tool to <strong>create</strong>, <strong>track</strong> and <strong>manage</strong> your daily tasks with ease.
                </p>

                <div className="features mt-4">
                    <p>✨ Create tasks and set priorities</p>
                    <p>📊 Track progress and deadlines</p>
                    <p>✅ Update status: Pending, In Progress, Completed</p>
                    <p>👤 Secure login and personalized task management</p>
                </div>

                <div className="d-flex flex-column align-items-center mt-4">
                    {/* Primary action */}
                    <Link to="/login" className="btn btn-primary btn-lg px-5 mb-3">
                        Login
                    </Link>

                    {/* Secondary action */}
                    <Link to="/register" className="btn btn-outline-success btn-md px-4">
                        Register
                    </Link>
                </div>


            </div>
        </div>
    );
}
