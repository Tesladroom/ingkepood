import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function AdminHome() {
    return (
    <div>
        <Link to="/admin/lisa">
        <Button className="btn btn-secondary">LISA TOODE</Button>
        </Link>
        <Link to="/admin/tooted">
        <Button className="btn btn-secondary">HALDA TOOTEID</Button>
        </Link>
        <Link to="/admin/kategooriad">
        <Button className="btn btn-secondary">KATEGOORIAD</Button>
        </Link>
    </div>)
    
    
    }
    export default AdminHome;