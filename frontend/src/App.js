import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [placements, setPlacements] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', college: '', qualification: '', year: '' });
  const [status, setStatus] = useState('Ready.');
  const [isError, setIsError] = useState(false);

  const API_BASE = '';

  useEffect(() => {
    fetchAll();
  }, []);

  const readForm = (includeId = false) => {
    const { id, name, college, qualification, year } = form;
    if (!name) throw new Error('Name is required');
    if (!college) throw new Error('College date is required');
    if (!qualification) throw new Error('Qualification is required');
    if (!year) throw new Error('Year is required');

    const payload = {
      name,
      college,
      qualification,
      year: Number(year)
    };
    if (includeId) {
      if (!id) throw new Error('ID is required');
      payload.id = Number(id);
    }
    return payload;
  };

  const setStatusMsg = (msg, error = false) => {
    setStatus(msg);
    setIsError(error);
  };

  const api = async (path, options) => {
    const res = await fetch(API_BASE + path, {
      headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
      ...options
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`HTTP ${res.status} ${res.statusText}${text ? ' - ' + text : ''}`);
    }
    return res.json().catch(() => null);
  };

  const addPlacement = async () => {
    try {
      setStatusMsg('Adding...');
      const payload = readForm(false);
      const created = await api('/addplacement', { method: 'POST', body: JSON.stringify(payload) });
      if (created && created.id != null) setForm({ ...form, id: created.id });
      setStatusMsg('Added successfully.');
      await fetchAll();
    } catch (e) {
      setStatusMsg(e.message, true);
    }
  };

  const updatePlacement = async () => {
    try {
      setStatusMsg('Updating...');
      const payload = readForm(true);
      await api('/updateplacement', { method: 'PUT', body: JSON.stringify(payload) });
      setStatusMsg('Updated successfully.');
      await fetchAll();
    } catch (e) {
      setStatusMsg(e.message, true);
    }
  };

  const deletePlacement = async () => {
    try {
      setStatusMsg('Deleting...');
      const { id } = form;
      if (!id) throw new Error('ID is required');
      await api('/deleteplacement/' + encodeURIComponent(id), { method: 'DELETE' });
      setStatusMsg('Deleted successfully.');
      setForm({ ...form, id: '' });
      await fetchAll();
    } catch (e) {
      setStatusMsg(e.message, true);
    }
  };

  const fillForm = (p) => {
    setForm({
      id: p.id ?? '',
      name: p.name ?? '',
      college: p.college ?? '',
      qualification: p.qualification ?? '',
      year: p.year ?? ''
    });
  };

  const fetchAll = async () => {
    try {
      setStatusMsg('Loading...');
      const data = await api('/getplacement', { method: 'GET' });
      setPlacements(Array.isArray(data) ? data : []);
      setStatusMsg(`Loaded ${data.length} record(s).`);
    } catch (e) {
      setStatusMsg(e.message, true);
    }
  };

  const loadOne = async (id) => {
    try {
      setStatusMsg('Fetching item...');
      const p = await api('/getplacement/' + encodeURIComponent(id), { method: 'GET' });
      fillForm(p);
      setStatusMsg('Loaded item.');
    } catch (e) {
      setStatusMsg(e.message, true);
    }
  };

  const prefillAndDelete = async (id) => {
    setForm({ ...form, id });
    await deletePlacement();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="container">
      <h1>Placement Management (CRUD)</h1>
      <div className="grid">
        <div className="card">
          <h2>Add / Update</h2>

          <label>ID (required for Update/Delete)</label>
          <input name="id" type="number" placeholder="e.g. 1" value={form.id} onChange={handleInputChange} />

          <label>Name</label>
          <input name="name" type="text" placeholder="e.g. John" value={form.name} onChange={handleInputChange} />

          <label>College (LocalDate: YYYY-MM-DD)</label>
          <input name="college" type="date" value={form.college} onChange={handleInputChange} />

          <label>Qualification</label>
          <input name="qualification" type="text" placeholder="e.g. B.Tech" value={form.qualification} onChange={handleInputChange} />

          <label>Year</label>
          <input name="year" type="number" placeholder="e.g. 2025" value={form.year} onChange={handleInputChange} />

          <div className="button-group">
            <button onClick={addPlacement}>Add</button>
            <button className="secondary" onClick={updatePlacement}>Update</button>
            <button className="danger" onClick={deletePlacement}>Delete</button>
          </div>

          <div className="muted">
            All endpoints come from backend:<br />
            <a href="#" onClick={(e) => { e.preventDefault(); fetchAll(); }}>/getplacement</a>,
            <a href="#" onClick={(e) => e.preventDefault()}>/addplacement</a>,
            <a href="#" onClick={(e) => e.preventDefault()}>/updateplacement</a>,
            <a href="#" onClick={(e) => e.preventDefault()}>/deleteplacement/{"{id}"}</a>
          </div>

          <div className={`status ${isError ? 'error' : ''}`}>{status}</div>
        </div>

        <div className="card">
          <div className="header">
            <h2>Placements</h2>
            <button className="secondary" onClick={fetchAll}>Refresh</button>
          </div>
          <table>
            <thead>
              <tr>
                <th style={{ width: '70px' }}>ID</th>
                <th>Name</th>
                <th>College</th>
                <th>Qualification</th>
                <th style={{ width: '90px' }}>Year</th>
                <th style={{ width: '180px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {placements.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ color: '#a7b3d1' }}>No records</td>
                </tr>
              ) : (
                placements.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name ?? ''}</td>
                    <td>{p.college ?? ''}</td>
                    <td>{p.qualification ?? ''}</td>
                    <td>{p.year ?? ''}</td>
                    <td className="row-actions">
                      <button onClick={() => loadOne(p.id)}>Load</button>
                      <button className="secondary" onClick={() => prefillAndDelete(p.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
