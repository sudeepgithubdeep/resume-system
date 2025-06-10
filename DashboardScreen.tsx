import { useState } from 'react';
import { Search, Filter, ChevronDown, Eye, Star, X, Clock, Check, Building } from 'lucide-react';
import { Button } from './ui/button';
import toast from 'react-hot-toast';

interface DashboardScreenProps {}

const DashboardScreen = ({}: DashboardScreenProps) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);
  
  // Show welcome toast when dashboard loads
  useState(() => {
    toast.success('Welcome to your dashboard!', {
      icon: '🎉',
      style: {
        background: '#3B82F6',
        color: '#fff',
      },
      duration: 3000
    });
  });
  
  // Mock data for applications
  const applications = [
    {
      id: 1,
      companyName: 'TechCorp Inc.',
      logoColor: '#4285F4',
      jobTitle: 'Frontend Developer',
      dateSent: 'June 8, 2025',
      lastUpdated: 'June 9, 2025',
      status: 'viewed'
    },
    {
      id: 2,
      companyName: 'Global Solutions',
      logoColor: '#34A853',
      jobTitle: 'UX Designer',
      dateSent: 'June 7, 2025',
      lastUpdated: 'June 10, 2025',
      status: 'shortlisted'
    },
    {
      id: 3,
      companyName: 'Innovate AI',
      logoColor: '#FBBC05',
      jobTitle: 'Product Manager',
      dateSent: 'June 5, 2025',
      lastUpdated: 'June 5, 2025',
      status: 'sent'
    },
    {
      id: 4,
      companyName: 'DataViz Systems',
      logoColor: '#EA4335',
      jobTitle: 'Data Analyst',
      dateSent: 'June 3, 2025',
      lastUpdated: 'June 6, 2025',
      status: 'interview'
    },
    {
      id: 5,
      companyName: 'CloudNet Services',
      logoColor: '#673AB7',
      jobTitle: 'DevOps Engineer',
      dateSent: 'June 1, 2025',
      lastUpdated: 'June 4, 2025',
      status: 'rejected'
    }
  ];

  // Filter applications based on selected status
  const filteredApplications = applications.filter(app => {
    if (filterStatus === 'all') return true;
    return app.status === filterStatus;
  });

  // Sort applications based on selected sort option
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    } else if (sortBy === 'company') {
      return a.companyName.localeCompare(b.companyName);
    } else if (sortBy === 'status') {
      const statusOrder = { sent: 0, viewed: 1, shortlisted: 2, interview: 3, rejected: 4 };
      return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
    }
    return 0;
  });

  // Get status display information
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'sent':
        return { 
          icon: <Clock className="h-4 w-4" />, 
          text: 'Sent', 
          color: 'bg-[#E0F2FE] text-[#50A7F9]' 
        };
      case 'viewed':
        return { 
          icon: <Eye className="h-4 w-4" />, 
          text: 'Viewed by Recruiter', 
          color: 'bg-[#D1FAE5] text-[#10B981]' 
        };
      case 'shortlisted':
        return { 
          icon: <Star className="h-4 w-4" />, 
          text: 'Shortlisted', 
          color: 'bg-[#FEF3C7] text-[#F59E0B]' 
        };
      case 'interview':
        return { 
          icon: <Check className="h-4 w-4" />, 
          text: 'Interview Scheduled', 
          color: 'bg-[#DBEAFE] text-[#3B82F6]' 
        };
      case 'rejected':
        return { 
          icon: <X className="h-4 w-4" />, 
          text: 'Not Proceeding', 
          color: 'bg-[#F3F4F6] text-[#6B7280]' 
        };
      default:
        return { 
          icon: <Clock className="h-4 w-4" />, 
          text: 'Unknown', 
          color: 'bg-gray-100 text-gray-500' 
        };
    }
  };

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
    toast(`Filtered to ${status === 'all' ? 'all applications' : status + ' applications'}`, {
      icon: '🔍',
      duration: 2000
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    toast(`Sorted by ${e.target.value === 'date' ? 'date' : e.target.value === 'company' ? 'company name' : 'status'}`, {
      icon: '📊',
      duration: 2000
    });
  };

  const handleApplicationClick = (application: any) => {
    toast.success(`Viewing details for ${application.companyName}`, {
      icon: '📋',
      duration: 2000
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-medium text-center text-[#495057] mb-3">
          Application Tracking
        </h1>
        
        <p className="text-[#868E96] mb-6 text-center">
          Track the journey of your resume and stay updated on your application statuses.
        </p>
        
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 transition-all hover:shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#868E96]" size={18} />
              <input
                type="text"
                placeholder="Search companies..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#50A7F9] focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2 transition-all hover:bg-gray-100"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} />
                Filters
                <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
              
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#50A7F9] focus:border-transparent transition-all"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="date">Sort by Date</option>
                  <option value="company">Sort by Company</option>
                  <option value="status">Sort by Status</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#868E96]" />
              </div>
            </div>
          </div>
          
          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'lightBlue' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('all')}
                  className="transition-all hover:shadow-md"
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === 'sent' ? 'lightBlue' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('sent')}
                  className="transition-all hover:shadow-md"
                >
                  Sent
                </Button>
                <Button
                  variant={filterStatus === 'viewed' ? 'lightBlue' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('viewed')}
                  className="transition-all hover:shadow-md"
                >
                  Viewed
                </Button>
                <Button
                  variant={filterStatus === 'shortlisted' ? 'lightBlue' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('shortlisted')}
                  className="transition-all hover:shadow-md"
                >
                  Shortlisted
                </Button>
                <Button
                  variant={filterStatus === 'interview' ? 'lightBlue' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('interview')}
                  className="transition-all hover:shadow-md"
                >
                  Interview
                </Button>
                <Button
                  variant={filterStatus === 'rejected' ? 'lightBlue' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('rejected')}
                  className="transition-all hover:shadow-md"
                >
                  Not Proceeding
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Applications List */}
        {sortedApplications.length > 0 ? (
          <div className="space-y-4">
            {sortedApplications.map((application) => {
              const statusInfo = getStatusInfo(application.status);
              
              return (
                <div 
                  key={application.id}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all transform hover:scale-[1.01] cursor-pointer"
                  onClick={() => handleApplicationClick(application)}
                >
                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-md flex items-center justify-center mr-4 flex-shrink-0"
                      style={{ backgroundColor: application.logoColor + '20' }}
                    >
                      <Building className="h-6 w-6" style={{ color: application.logoColor }} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-[#495057] truncate">
                            {application.companyName}
                          </h3>
                          <p className="text-[#868E96] text-sm">
                            {application.jobTitle}
                          </p>
                        </div>
                        
                        <div className="mt-2 md:mt-0 flex items-center">
                          <span className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                            {statusInfo.icon}
                            <span className="ml-1">{statusInfo.text}</span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-2 text-xs text-[#868E96]">
                        <span>Sent: {application.dateSent}</span>
                        <span className="mx-2">•</span>
                        <span>Updated: {application.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-[#E0F2FE] flex items-center justify-center">
                <Search className="h-8 w-8 text-[#50A7F9]" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-[#495057] mb-2">No applications found</h3>
            <p className="text-[#868E96]">
              {filterStatus === 'all' 
                ? "You haven't sent your resume to any companies yet. Get started by uploading your resume!"
                : "No applications match your current filters. Try adjusting your filters to see more results."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardScreen;
