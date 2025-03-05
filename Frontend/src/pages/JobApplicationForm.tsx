import { forwardRef, useImperativeHandle, useState } from "react";
import Input from "../components/Input";
import Select from "../components/Select";

// Define types for form data
interface JobApplicationFormData {
    jobTitle: string;
    companyName: string;
    jobLocation: string;
    jobType: string;
    usedResume?: string;
    usedCoverLetter?: string;
    status: string;
  }
  
  interface JobApplicationFormProps {
    onClose: () => void;
  }
  
  const JobApplicationForm = forwardRef(({ onClose }: any, ref) => {

    useImperativeHandle(ref, () =>({
        submit(){
            console.log('Submitted');
            handleSubmit(new Event('submit') as unknown as React.FormEvent<HTMLFormElement>);
        }
    }));

    const [formData, setFormData] = useState<JobApplicationFormData>({
      jobTitle: '',
      companyName: '',
      jobLocation: '',
      jobType: '',
      usedResume: '',
      usedCoverLetter: '',
      status: 'Sent Application'
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const userId = localStorage.getItem('userId'); // Replace with your auth method
  
        const submitData = {
          ...formData,
          userId: userId
        };

        console.log(submitData);
  
        // const response = await axios.post('/api/job-applications', submitData);
        
        // Reset form after successful submission
        setFormData({
          jobTitle: '',
          companyName: '',
          jobLocation: '',
          jobType: '',
          usedResume: '',
          usedCoverLetter: '',
          status: 'Sent Application'
        });
  
        // Close modal after successful submission
        onClose();
      } catch (error) {
        console.error('Error submitting job application:', error);
        alert('Failed to submit job application');
      }
    };
  
    const jobTypeOptions = [
      { value: 'Full-Time', label: 'Full-Time' },
      { value: 'Part-Time', label: 'Part-Time' },
      { value: 'Contract', label: 'Contract' },
      { value: 'Freelance', label: 'Freelance' },
      { value: 'Internship', label: 'Internship' }
    ];
  
    const statusOptions = [
      { value: 'Sent Application', label: 'Sent Application' },
      { value: 'Shortlisted', label: 'Shortlisted' },
      { value: 'Interview', label: 'Interview' },
      { value: 'Offer', label: 'Offer' },
      { value: 'Rejected', label: 'Rejected' }
    ];
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="jobTitle"
          name="jobTitle"
          label="Job Title"
          value={formData.jobTitle}
          onChange={handleChange}
          required
          placeholder="Enter job title"
        />
  
        <Input
          id="companyName"
          name="companyName"
          label="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
          placeholder="Enter company name"
        />
  
        <Input
          id="jobLocation"
          name="jobLocation"
          label="Job Location"
          value={formData.jobLocation}
          onChange={handleChange}
          required
          placeholder="Enter job location"
        />
  
        <Select
          name="jobType"
          label="Job Type"
          value={formData.jobType}
          onChange={handleChange}
          options={jobTypeOptions}
          required
        />
  
        <Input
          id="usedResume"
          name="usedResume"
          label="Resume Used (Optional)"
          value={formData.usedResume || ''}
          onChange={handleChange}
          placeholder="Enter resume details"
        />
  
        <Input
          id="usedCoverLetter"
          name="usedCoverLetter"
          label="Cover Letter Used (Optional)"
          value={formData.usedCoverLetter || ''}
          onChange={handleChange}
          placeholder="Enter cover letter details"
        />
  
        <Select
          name="status"
          label="Application Status"
          value={formData.status}
          onChange={handleChange}
          options={statusOptions}
          required
        />
  
        {/* <div className="flex justify-end space-x-3 pt-4">
          <Button 
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
          >
            Add Job Application
          </Button>
        </div> */}
      </form>
    );
  });
  
  export default JobApplicationForm;