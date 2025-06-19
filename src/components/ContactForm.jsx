import { useState, useEffect } from 'react';

export function ContactForm({ title, onSave, initialData }) {
    const [formData, setFormData] = useState(
        {
            name: "",
            phone: "",
            email: "",
            address: "",
            ...initialData
        });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSave(formData);
    }

    useEffect(() => {
        setFormData({
            ...formData,
            ...initialData
        })
    }, [initialData])

    return (
        <div className="container">
            <div className="col-12">
                <h1 className="text-center pt-5">{title}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input placeholder="Enter name" type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Phone</label>
                        <input placeholder="Enter phone" type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input placeholder="Enter email" type="text" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Address</label>
                        <input placeholder="Enter address" type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-outline-success">Submit</button>
                </form>
            </div>
        </div>
    )
}