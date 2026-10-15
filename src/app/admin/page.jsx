'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  Users, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Search, 
  Download, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  Plus,
  Save,
  Image as ImageIcon,
  Layout,
  DollarSign,
  PhoneCall,
  Edit2
} from 'lucide-react';

const DEFAULT_PROJECTS = [
  {
    id: 'proj-1',
    title: '5 kW Residential Rooftop De-soiling',
    capacity: '5 kW System',
    location: 'Gomti Nagar, Lucknow',
    image: '/projects/solar_home.jpg',
    description: 'Thick dust and pollution film removed using demineralized RO water and soft rotary brushes. Generation boosted by 28%.',
    ctaText: 'Book Similar Home Cleaning',
  },
  {
    id: 'proj-2',
    title: '120 kW Industrial Warehouse Rooftop',
    capacity: '120 kW Industrial',
    location: 'Transport Nagar, Lucknow',
    image: '/projects/solar_commercial.jpg',
    description: 'Scheduled multi-technician shift with safety harnesses during non-operational hours. Full generation audit & GST tax invoice provided.',
    ctaText: 'Request Factory Survey',
  },
  {
    id: 'proj-3',
    title: '45 kW Apartment Society Common Solar',
    capacity: '45 kW RWA Plant',
    location: 'Amar Shaheed Path, Lucknow',
    image: '/projects/solar_society.jpg',
    description: 'Regular monthly AMC service for common lifts & water pumps solar system. High-resolution before & after photo report sent to RWA committee.',
    ctaText: 'Get Housing Society AMC',
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'cms'
  const [cmsSubTab, setCmsSubTab] = useState('projects'); // 'projects' | 'hero' | 'rates' | 'contact'
  const [leads, setLeads] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [authenticated, setAuthenticated] = useState(false);

  // CMS Settings State
  const [cmsSettings, setCmsSettings] = useState({
    phone: '919648847816',
    city: 'Lucknow',
    ratePerKw: 100,
    minCharge: 500,
    gstin: '',
    workingHours: 'Mon – Sun: 7:00 AM – 7:00 PM',
    notificationEmail: '',
    isEmailAlertsActive: true,
    heroBadge: 'Professional Solar Panel Cleaning in Lucknow',
    heroTitle: 'Clean panels.',
    heroTitleHighlight: 'More power. Lower bills.',
    heroDescription: 'Dust, bird droppings and pollution quietly cut your solar generation by up to 30%. We clean home rooftops, housing societies and commercial solar plants safely, with soft brushes and treated demineralized water, on a schedule that suits you.',
    heroStat1Title: 'Up to 30% Boost',
    heroStat1Sub: 'In daily energy output',
    heroStat2Title: 'Treated RO Water',
    heroStat2Sub: 'Soft scratch-free brushes',
    heroStat3Title: 'GST Invoices',
    heroStat3Sub: '& WhatsApp photo reports',
    projects: DEFAULT_PROJECTS,
  });

  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSavedAlert, setSettingsSavedAlert] = useState(false);

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem('solar_admin_auth');
    if (!token) {
      router.push('/admin/login');
    } else {
      setAuthenticated(true);
      fetchLeads();
      fetchSettings();
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('solar_admin_auth');
    document.cookie = 'solar_admin_session=; Max-Age=0; path=/;';
    router.push('/admin/login');
  };

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setLeads(data.data);
      }
    } catch (err) {
      console.error('Failed to load leads:', err);
    } finally {
      setLoadingLeads(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success && data.data) {
        setCmsSettings((prev) => ({
          ...prev,
          ...data.data,
          projects: Array.isArray(data.data.projects) && data.data.projects.length > 0 
            ? data.data.projects 
            : DEFAULT_PROJECTS
        }));
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
  };

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      setLeads((prev) =>
        prev.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l))
      );

      await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.error('Failed to update status:', err);
      fetchLeads();
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;

    try {
      setLeads((prev) => prev.filter((l) => l._id !== leadId));
      await fetch(`/api/leads/${leadId}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.error('Failed to delete lead:', err);
      fetchLeads();
    }
  };

  const handleSaveSettings = async (e) => {
    if (e) e.preventDefault();
    setSavingSettings(true);
    setSettingsSavedAlert(false);

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cmsSettings),
      });
      const data = await res.json();
      if (data.success) {
        setSettingsSavedAlert(true);
        setTimeout(() => setSettingsSavedAlert(false), 4000);
      }
    } catch (err) {
      alert('Failed to save settings: ' + err.message);
    } finally {
      setSavingSettings(false);
    }
  };

  // Project Gallery Handlers
  const handleAddProject = () => {
    const newProj = {
      id: 'proj-' + Date.now(),
      title: 'New Solar Cleaning Project',
      capacity: '10 kW Residential',
      location: cmsSettings.city || 'Lucknow',
      image: '/projects/solar_home.jpg',
      description: 'Panel surface deep cleaned with soft rotary brushes and pure RO water. High generation efficiency restored.',
      ctaText: 'Book Similar Cleaning',
    };
    setCmsSettings((prev) => ({
      ...prev,
      projects: [newProj, ...prev.projects]
    }));
  };

  const handleUpdateProject = (index, field, value) => {
    setCmsSettings((prev) => {
      const updated = [...prev.projects];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, projects: updated };
    });
  };

  const handleDeleteProject = (index) => {
    if (!window.confirm('Remove this project from the showcase gallery?')) return;
    setCmsSettings((prev) => {
      const updated = prev.projects.filter((_, i) => i !== index);
      return { ...prev, projects: updated };
    });
  };

  // Export leads to CSV
  const exportToCSV = () => {
    if (leads.length === 0) {
      alert('No leads available to export.');
      return;
    }

    const headers = ['Date', 'Name', 'Phone', 'Category', 'Plant Size (kW)', 'Preferred Date', 'Preferred Time', 'Address', 'Status', 'GPS Location'];
    const rows = leads.map((l) => [
      `"${new Date(l.createdAt || Date.now()).toLocaleDateString('en-IN')}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${l.customerPhone || ''}"`,
      `"${l.type || 'Home owner'}"`,
      `"${l.size || ''}"`,
      `"${l.preferredDate || 'Earliest'}"`,
      `"${l.preferredTime || '-'}"`,
      `"${(l.address || '').replace(/"/g, '""')}"`,
      `"${l.status || 'new'}"`,
      `"${l.locationCoords || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `solar_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtering leads
  const filteredLeads = leads.filter((l) => {
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      (l.name && l.name.toLowerCase().includes(q)) ||
      (l.customerPhone && l.customerPhone.includes(q)) ||
      (l.address && l.address.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'new').length;
  const contactedLeads = leads.filter((l) => l.status === 'contacted').length;
  const completedLeads = leads.filter((l) => l.status === 'completed').length;

  if (!authenticated) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Verifying authorization...</div>;
  }

  return (
    <div className="admin-root">
      {/* Top Navbar */}
      <header className="admin-nav">
        <div className="nav-left">
          <div className="admin-logo-box">
            <Sparkles size={18} />
          </div>
          <div>
            <span className="brand-name">Solar<span>Cleaner</span></span>
            <span className="portal-badge">Admin CRM &amp; CMS</span>
          </div>
        </div>

        <div className="nav-center">
          <button
            onClick={() => setActiveTab('leads')}
            className={`tab-btn ${activeTab === 'leads' ? 'tab-active' : ''}`}
          >
            <Users size={17} />
            <span>Leads CRM</span>
            {newLeads > 0 && <span className="unread-counter">{newLeads}</span>}
          </button>

          <button
            onClick={() => setActiveTab('cms')}
            className={`tab-btn ${activeTab === 'cms' ? 'tab-active' : ''}`}
          >
            <Settings size={17} />
            <span>Website CMS</span>
          </button>
        </div>

        <div className="nav-right">
          <a href="/" target="_blank" className="btn btn-secondary btn-sm link-live-btn">
            <span>View Site</span>
            <ExternalLink size={14} />
          </a>
          <button onClick={handleLogout} className="logout-btn" title="Sign Out">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-main">
        {activeTab === 'leads' ? (
          <div className="leads-view">
            {/* KPI Cards */}
            <div className="kpi-grid">
              <div className="kpi-card">
                <span className="kpi-title">Total Bookings</span>
                <span className="kpi-num">{totalLeads}</span>
                <span className="kpi-sub">All-time website inquiries</span>
              </div>
              <div className="kpi-card card-new">
                <span className="kpi-title">New / Pending</span>
                <span className="kpi-num text-amber">{newLeads}</span>
                <span className="kpi-sub">Awaiting team response</span>
              </div>
              <div className="kpi-card">
                <span className="kpi-title">In-Progress / Contacted</span>
                <span className="kpi-num text-blue">{contactedLeads}</span>
                <span className="kpi-sub">Field slot being scheduled</span>
              </div>
              <div className="kpi-card">
                <span className="kpi-title">Completed Cleanings</span>
                <span className="kpi-num text-green">{completedLeads}</span>
                <span className="kpi-sub">Service fulfilled</span>
              </div>
            </div>

            {/* Toolbar */}
            <div className="toolbar-row">
              <div className="search-box">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by customer name, phone, or colony..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="toolbar-actions">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Statuses ({totalLeads})</option>
                  <option value="new">New ({newLeads})</option>
                  <option value="contacted">Contacted ({contactedLeads})</option>
                  <option value="completed">Completed ({completedLeads})</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button onClick={fetchLeads} className="btn btn-secondary btn-sm" title="Refresh list">
                  <RefreshCw size={15} className={loadingLeads ? 'spin' : ''} />
                  <span>Refresh</span>
                </button>

                <button onClick={exportToCSV} className="btn btn-sm export-btn" title="Download Excel CSV">
                  <Download size={15} />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div className="leads-table-container">
              {filteredLeads.length === 0 ? (
                <div className="empty-state">
                  <Users size={48} className="empty-icon" />
                  <h3>No leads found</h3>
                  <p>
                    {searchQuery || statusFilter !== 'all'
                      ? 'No inquiries match your current filters.'
                      : 'New booking requests from your website will show up here.'}
                  </p>
                </div>
              ) : (
                <table className="leads-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Customer Details</th>
                      <th>Category &amp; Size</th>
                      <th>Scheduled Slot</th>
                      <th>Address &amp; GPS</th>
                      <th>Direct Contact</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => {
                      const cleanPhone = (lead.customerPhone || '').replace(/\D/g, '');
                      const waText = encodeURIComponent(
                        `Hi ${lead.name}, regarding your solar panel cleaning request for ${lead.size ? `${lead.size} kW` : 'your setup'} in ${lead.city || 'Lucknow'}.`
                      );
                      const waLink = `https://wa.me/91${cleanPhone.slice(-10)}?text=${waText}`;

                      return (
                        <tr key={lead._id}>
                          <td className="date-col">
                            <span>{new Date(lead.createdAt || Date.now()).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                            <small>{new Date(lead.createdAt || Date.now()).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</small>
                          </td>
                          <td className="customer-col">
                            <strong>{lead.name}</strong>
                            <a href={`tel:${lead.customerPhone}`} className="phone-link">
                              {lead.customerPhone}
                            </a>
                          </td>
                          <td className="type-col">
                            <span className="type-badge">{lead.type || 'Home owner'}</span>
                            {lead.size && <span className="size-pill">{lead.size} kW</span>}
                          </td>
                          <td className="slot-col">
                            {lead.preferredDate ? (
                              <div className="slot-badge">
                                <strong>📅 {lead.preferredDate}</strong>
                                <small>⏰ {lead.preferredTime || 'Anytime'}</small>
                              </div>
                            ) : (
                              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Earliest Slot</span>
                            )}
                          </td>
                          <td className="address-col">
                            <p>{lead.address || '-'}</p>
                            {lead.locationCoords && (
                              <a
                                href={lead.locationCoords}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="map-badge"
                              >
                                <MapPin size={12} />
                                <span>Open Google Maps Location</span>
                              </a>
                            )}
                          </td>
                          <td className="actions-col">
                            <div className="contact-btns">
                              <a
                                href={`tel:${lead.customerPhone}`}
                                className="contact-icon-btn call-btn"
                                title="Call customer"
                              >
                                <Phone size={15} />
                              </a>
                              <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-icon-btn wa-btn"
                                title="WhatsApp chat"
                              >
                                <MessageCircle size={15} />
                              </a>
                            </div>
                          </td>
                          <td className="status-col">
                            <select
                              value={lead.status || 'new'}
                              onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                              className={`status-dropdown status-${lead.status || 'new'}`}
                            >
                              <option value="new">● New</option>
                              <option value="contacted">● Contacted</option>
                              <option value="completed">● Completed</option>
                              <option value="cancelled">● Cancelled</option>
                            </select>
                          </td>
                          <td className="delete-col">
                            <button
                              onClick={() => handleDeleteLead(lead._id)}
                              className="delete-btn"
                              title="Delete record"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ) : (
          /* Tab 2: Full-Featured Website CMS */
          <div className="cms-view">
            <div className="cms-wrapper-card">
              <div className="cms-header-row">
                <div>
                  <h2>Website CMS Content &amp; Pricing Manager</h2>
                  <p>Changes saved here update the live homepage and calculator immediately.</p>
                </div>

                <button 
                  onClick={handleSaveSettings} 
                  disabled={savingSettings} 
                  className="btn btn-wa btn-md save-top-btn"
                >
                  <Save size={18} />
                  <span>{savingSettings ? 'Saving...' : 'Save All Changes'}</span>
                </button>
              </div>

              {settingsSavedAlert && (
                <div className="saved-alert">
                  <CheckCircle2 size={18} />
                  <span>All website changes saved successfully! Live website updated.</span>
                </div>
              )}

              {/* CMS Sub Navigation Tabs */}
              <div className="cms-subtabs">
                <button
                  type="button"
                  onClick={() => setCmsSubTab('projects')}
                  className={`subtab-btn ${cmsSubTab === 'projects' ? 'subtab-active' : ''}`}
                >
                  <ImageIcon size={16} />
                  <span>Projects Gallery ({cmsSettings.projects?.length || 0})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCmsSubTab('hero')}
                  className={`subtab-btn ${cmsSubTab === 'hero' ? 'subtab-active' : ''}`}
                >
                  <Layout size={16} />
                  <span>Hero &amp; Headlines</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCmsSubTab('rates')}
                  className={`subtab-btn ${cmsSubTab === 'rates' ? 'subtab-active' : ''}`}
                >
                  <DollarSign size={16} />
                  <span>Pricing &amp; Calculator</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCmsSubTab('contact')}
                  className={`subtab-btn ${cmsSubTab === 'contact' ? 'subtab-active' : ''}`}
                >
                  <PhoneCall size={16} />
                  <span>Contact &amp; Hours</span>
                </button>
              </div>

              {/* Subtab 1: Recent Projects Gallery */}
              {cmsSubTab === 'projects' && (
                <div className="subtab-content">
                  <div className="projects-control-header">
                    <div>
                      <h3>Recent Cleaning Projects Showcase</h3>
                      <p>Add, edit or change images and descriptions of rooftop services you have performed.</p>
                    </div>
                    <button type="button" onClick={handleAddProject} className="btn btn-secondary btn-sm">
                      <Plus size={16} />
                      <span>Add New Project</span>
                    </button>
                  </div>

                  <div className="projects-edit-grid">
                    {cmsSettings.projects?.map((proj, idx) => (
                      <div key={proj.id || idx} className="project-edit-card">
                        <div className="proj-card-top">
                          <span className="proj-num-badge">Project #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteProject(idx)}
                            className="proj-del-btn"
                            title="Remove project"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div className="proj-edit-fields">
                          <div className="form-group">
                            <label>Project Title</label>
                            <input
                              type="text"
                              value={proj.title || ''}
                              onChange={(e) => handleUpdateProject(idx, 'title', e.target.value)}
                              placeholder="e.g. 5 kW Rooftop Cleaning"
                            />
                          </div>

                          <div className="form-row-2">
                            <div className="form-group">
                              <label>Capacity Tag</label>
                              <input
                                type="text"
                                value={proj.capacity || ''}
                                onChange={(e) => handleUpdateProject(idx, 'capacity', e.target.value)}
                                placeholder="e.g. 5 kW System"
                              />
                            </div>
                            <div className="form-group">
                              <label>Location / Society</label>
                              <input
                                type="text"
                                value={proj.location || ''}
                                onChange={(e) => handleUpdateProject(idx, 'location', e.target.value)}
                                placeholder="e.g. Gomti Nagar, Lucknow"
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Image URL / Path</label>
                            <input
                              type="text"
                              value={proj.image || ''}
                              onChange={(e) => handleUpdateProject(idx, 'image', e.target.value)}
                              placeholder="/projects/solar_home.jpg"
                            />
                            {proj.image && (
                              <div className="proj-thumb-preview">
                                <img src={proj.image} alt="Preview" />
                              </div>
                            )}
                          </div>

                          <div className="form-group">
                            <label>Work Summary &amp; Results</label>
                            <textarea
                              rows={2}
                              value={proj.description || ''}
                              onChange={(e) => handleUpdateProject(idx, 'description', e.target.value)}
                              placeholder="Describe the cleaning outcome, dust removal, or generation boost..."
                            />
                          </div>

                          <div className="form-group">
                            <label>CTA Button Text</label>
                            <input
                              type="text"
                              value={proj.ctaText || ''}
                              onChange={(e) => handleUpdateProject(idx, 'ctaText', e.target.value)}
                              placeholder="Book Similar Service"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Subtab 2: Hero Section */}
              {cmsSubTab === 'hero' && (
                <div className="subtab-content">
                  <h3>Hero Banner &amp; Key Value Propositions</h3>
                  <div className="cms-form-grid">
                    <div className="form-group span-2">
                      <label>Hero Floating Badge</label>
                      <input
                        type="text"
                        value={cmsSettings.heroBadge || ''}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, heroBadge: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Main Headline Line 1</label>
                      <input
                        type="text"
                        value={cmsSettings.heroTitle || ''}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, heroTitle: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Highlighted Headline Line 2</label>
                      <input
                        type="text"
                        value={cmsSettings.heroTitleHighlight || ''}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, heroTitleHighlight: e.target.value })}
                      />
                    </div>

                    <div className="form-group span-2">
                      <label>Hero Description Paragraph</label>
                      <textarea
                        rows={3}
                        value={cmsSettings.heroDescription || ''}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, heroDescription: e.target.value })}
                      />
                    </div>

                    {/* Stat 1 */}
                    <div className="form-group">
                      <label>Stat 1 Title</label>
                      <input
                        type="text"
                        value={cmsSettings.heroStat1Title || ''}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, heroStat1Title: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Stat 1 Subtitle</label>
                      <input
                        type="text"
                        value={cmsSettings.heroStat1Sub || ''}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, heroStat1Sub: e.target.value })}
                      />
                    </div>

                    {/* Stat 2 */}
                    <div className="form-group">
                      <label>Stat 2 Title</label>
                      <input
                        type="text"
                        value={cmsSettings.heroStat2Title || ''}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, heroStat2Title: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Stat 2 Subtitle</label>
                      <input
                        type="text"
                        value={cmsSettings.heroStat2Sub || ''}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, heroStat2Sub: e.target.value })}
                      />
                    </div>

                    {/* Stat 3 */}
                    <div className="form-group">
                      <label>Stat 3 Title</label>
                      <input
                        type="text"
                        value={cmsSettings.heroStat3Title || ''}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, heroStat3Title: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Stat 3 Subtitle</label>
                      <input
                        type="text"
                        value={cmsSettings.heroStat3Sub || ''}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, heroStat3Sub: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Subtab 3: Pricing */}
              {cmsSubTab === 'rates' && (
                <div className="subtab-content">
                  <h3>Pricing &amp; Calculator Configuration</h3>
                  <div className="cms-form-grid">
                    <div className="form-group">
                      <label>Rate Per kW (₹)</label>
                      <input
                        type="number"
                        min="10"
                        value={cmsSettings.ratePerKw || ''}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, ratePerKw: Number(e.target.value) })}
                      />
                      <small>Standard per-kW pricing applied in Instant Estimate Calculator.</small>
                    </div>

                    <div className="form-group">
                      <label>Minimum Visit Charge (₹)</label>
                      <input
                        type="number"
                        min="100"
                        value={cmsSettings.minCharge || ''}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, minCharge: Number(e.target.value) })}
                      />
                      <small>Lowest visit fee for small plants under 5 kW.</small>
                    </div>
                  </div>
                </div>
              )}

              {/* Subtab 4: Contact & General */}
              {cmsSubTab === 'contact' && (
                <div className="subtab-content">
                  <h3>Master Contact Details &amp; Location</h3>
                  <div className="cms-form-grid">
                    <div className="form-group">
                      <label>Primary Phone / WhatsApp Hotline (Without '+')</label>
                      <input
                        type="text"
                        value={cmsSettings.phone || ''}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, phone: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Primary City</label>
                      <input
                        type="text"
                        value={cmsSettings.city || ''}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, city: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Working Hours</label>
                      <input
                        type="text"
                        value={cmsSettings.workingHours || ''}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, workingHours: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>GSTIN Tax Number (Optional)</label>
                      <input
                        type="text"
                        value={cmsSettings.gstin || ''}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, gstin: e.target.value })}
                      />
                    </div>

                    <div className="form-group span-2">
                      <label>Admin Email for Instant Lead Alerts</label>
                      <input
                        type="email"
                        value={cmsSettings.notificationEmail || ''}
                        onChange={(e) => setCmsSettings({ ...cmsSettings, notificationEmail: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="cms-bottom-bar">
                <button 
                  onClick={handleSaveSettings} 
                  disabled={savingSettings} 
                  className="btn btn-wa btn-lg save-bottom-btn"
                >
                  <Save size={20} />
                  <span>{savingSettings ? 'Saving All Settings...' : 'Save All Website Changes'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        .admin-root {
          min-height: 100vh;
          background: #f8fafc;
          color: #1e293b;
          font-family: inherit;
        }

        .admin-nav {
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .admin-logo-box {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #f59e0b;
          color: #1d2433;
          display: grid;
          place-items: center;
          font-weight: 800;
        }

        .brand-name {
          font-size: 1.2rem;
          font-weight: 800;
          color: #0f172a;
        }

        .brand-name span {
          color: #f59e0b;
        }

        .portal-badge {
          display: block;
          font-size: 0.72rem;
          color: #64748b;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .nav-center {
          display: flex;
          gap: 8px;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1px solid transparent;
          padding: 9px 18px;
          border-radius: 10px;
          color: #64748b;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.95rem;
          transition: all 0.2s ease;
        }

        .tab-btn:hover {
          color: #0f172a;
          background: #f1f5f9;
        }

        .tab-active {
          background: #fef3c7 !important;
          color: #b45309 !important;
          border-color: #fde68a !important;
          font-weight: 700;
        }

        .unread-counter {
          background: #ef4444;
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 9999px;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logout-btn {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          color: #64748b;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          cursor: pointer;
        }

        .logout-btn:hover {
          background: #fee2e2;
          color: #ef4444;
        }

        .admin-main {
          max-width: 1220px;
          margin: 0 auto;
          padding: 26px 20px 60px;
        }

        /* KPI Cards */
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .kpi-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .kpi-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .kpi-num {
          font-size: 2.1rem;
          font-weight: 800;
          color: #0f172a;
          margin: 4px 0;
          line-height: 1.1;
        }

        .kpi-sub {
          font-size: 0.8rem;
          color: #94a3b8;
        }

        .text-amber { color: #d97706; }
        .text-blue { color: #2563eb; }
        .text-green { color: #16a34a; }

        /* Toolbar */
        .toolbar-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          margin-bottom: 18px;
          flex-wrap: wrap;
        }

        .search-box {
          position: relative;
          flex: 1;
          min-width: 280px;
        }

        .search-box input {
          width: 100%;
          padding: 10px 14px 10px 38px;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          font-size: 0.92rem;
          color: #0f172a;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        .toolbar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .filter-select {
          padding: 9px 12px;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          font-size: 0.88rem;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
        }

        .export-btn {
          background: #0f172a;
          color: #ffffff;
        }

        /* Leads Table */
        .leads-table-container {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          overflow-x: auto;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .leads-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.9rem;
        }

        .leads-table th {
          background: #f8fafc;
          padding: 13px 16px;
          color: #64748b;
          font-weight: 700;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid #e2e8f0;
          white-space: nowrap;
        }

        .leads-table td {
          padding: 14px 16px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
        }

        .date-col span {
          display: block;
          font-weight: 700;
          color: #1e293b;
        }

        .date-col small {
          color: #94a3b8;
          font-size: 0.75rem;
        }

        .customer-col strong {
          display: block;
          color: #0f172a;
          font-size: 0.95rem;
        }

        .phone-link {
          color: #d97706;
          font-weight: 600;
          text-decoration: none;
          font-size: 0.85rem;
        }

        .type-badge {
          display: inline-block;
          background: #f1f5f9;
          color: #475569;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 6px;
          margin-right: 6px;
        }

        .size-pill {
          background: #fef3c7;
          color: #b45309;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .address-col p {
          margin: 0;
          font-size: 0.85rem;
          color: #334155;
          max-width: 240px;
        }

        .map-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #4f46e5;
          background: #eef2ff;
          border: 1px solid #c7d2fe;
          padding: 4px 9px;
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          text-decoration: none;
          margin-top: 5px;
          transition: background 0.15s ease;
        }

        .map-badge:hover {
          background: #e0e7ff;
        }

        .contact-btns {
          display: flex;
          gap: 8px;
        }

        .contact-icon-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          text-decoration: none;
        }

        .call-btn {
          background: #f1f5f9;
          color: #0f172a;
          border: 1px solid #cbd5e1;
        }

        .wa-btn {
          background: #25d366;
          color: #ffffff;
        }

        .status-dropdown {
          padding: 6px 10px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.82rem;
          cursor: pointer;
          border: 1px solid transparent;
        }

        .status-new {
          background: #fef3c7;
          color: #b45309;
          border-color: #fde68a;
        }

        .status-contacted {
          background: #dbeafe;
          color: #1d4ed8;
          border-color: #bfdbfe;
        }

        .status-completed {
          background: #dcfce7;
          color: #15803d;
          border-color: #bbf7d0;
        }

        .status-cancelled {
          background: #f1f5f9;
          color: #64748b;
          border-color: #e2e8f0;
        }

        .delete-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 6px;
        }

        .delete-btn:hover {
          color: #ef4444;
        }

        .empty-state {
          padding: 60px 20px;
          text-align: center;
          color: #64748b;
        }

        .empty-icon {
          color: #cbd5e1;
          margin-bottom: 12px;
        }

        /* CMS Wrapper Styles */
        .cms-wrapper-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 28px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .cms-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          gap: 16px;
          flex-wrap: wrap;
        }

        .cms-header-row h2 {
          font-size: 1.45rem;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .cms-header-row p {
          color: #64748b;
          font-size: 0.92rem;
          margin: 0;
        }

        .saved-alert {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #dcfce7;
          color: #166534;
          border: 1px solid #bbf7d0;
          padding: 12px 18px;
          border-radius: 10px;
          font-size: 0.92rem;
          font-weight: 600;
          margin-bottom: 22px;
        }

        .cms-subtabs {
          display: flex;
          gap: 8px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 14px;
          margin-bottom: 26px;
          overflow-x: auto;
        }

        .subtab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid transparent;
          background: transparent;
          color: #64748b;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .subtab-btn:hover {
          color: #0f172a;
          background: #f1f5f9;
        }

        .subtab-active {
          background: #0f172a !important;
          color: #ffffff !important;
        }

        .subtab-content h3 {
          font-size: 1.15rem;
          color: #0f172a;
          margin-bottom: 18px;
        }

        /* Projects Edit Grid */
        .projects-control-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          gap: 12px;
          flex-wrap: wrap;
        }

        .projects-control-header h3 {
          margin: 0 0 4px;
        }

        .projects-control-header p {
          margin: 0;
          font-size: 0.88rem;
          color: #64748b;
        }

        .projects-edit-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
        }

        .project-edit-card {
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          padding: 20px;
        }

        .proj-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .proj-num-badge {
          background: #e2e8f0;
          color: #475569;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
          text-transform: uppercase;
        }

        .proj-del-btn {
          background: transparent;
          border: none;
          color: #ef4444;
          cursor: pointer;
          padding: 4px;
        }

        .proj-edit-fields {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .proj-thumb-preview {
          margin-top: 8px;
          border-radius: 8px;
          overflow: hidden;
          height: 120px;
          background: #e2e8f0;
        }

        .proj-thumb-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* General CMS Form Grid */
        .cms-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .span-2 {
          grid-column: span 2;
        }

        .admin-root input,
        .admin-root textarea,
        .admin-root select,
        .form-group input, 
        .form-group textarea,
        .form-group select,
        .project-edit-card input,
        .project-edit-card textarea {
          width: 100%;
          padding: 11px 14px;
          border-radius: 8px;
          border: 1.5px solid #cbd5e1 !important;
          background: #ffffff !important;
          color: #0f172a !important;
          font-size: 0.95rem !important;
          font-weight: 600 !important;
          font-family: inherit;
          opacity: 1 !important;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus,
        .project-edit-card input:focus,
        .project-edit-card textarea:focus {
          outline: none;
          border-color: #f59e0b !important;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.25) !important;
          color: #0f172a !important;
          background: #ffffff !important;
        }

        .form-group label,
        .project-edit-card label {
          font-size: 0.88rem;
          font-weight: 700;
          color: #0f172a !important;
          margin-bottom: 6px;
          display: block;
        }

        .form-group small {
          display: block;
          font-size: 0.8rem;
          color: #475569 !important;
          margin-top: 4px;
          font-weight: 500;
        }

        input::placeholder,
        textarea::placeholder {
          color: #94a3b8 !important;
          font-weight: 400 !important;
          opacity: 1 !important;
        }

        .cms-bottom-bar {
          margin-top: 32px;
          border-top: 1px solid #e2e8f0;
          padding-top: 22px;
        }

        .save-bottom-btn {
          min-width: 260px;
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 800px) {
          .cms-form-grid, .form-row-2 {
            grid-template-columns: 1fr;
          }
          .span-2 {
            grid-column: span 1;
          }
          .toolbar-row {
            flex-direction: column;
            align-items: stretch;
          }
          .admin-nav {
            flex-direction: column;
            gap: 14px;
          }
        }
      `}</style>
    </div>
  );
}
