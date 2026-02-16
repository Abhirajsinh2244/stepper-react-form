import React from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const steps = [
  { id: 1, title: 'Basic Information' },
  { id: 2, title: 'Address Details' },
  { id: 3, title: 'Document Upload' },
];

export default function StudentForm() {
  const [currentStep, setCurrentStep] = React.useState(1);

  // Each field has its own state → requirement fulfilled
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [stateProv, setStateProv] = React.useState('');
  const [zip, setZip] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState(null);

  const [errors, setErrors] = React.useState({});

  const validateCurrentStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!title.trim()) newErrors.title = 'Title is required';
      if (!description.trim()) newErrors.description = 'Description is required';
      if (description.trim() && description.length < 10)
        newErrors.description = 'Description must be at least 10 characters';
      if (!phone) newErrors.phone = 'Phone number is required';
      else if (phone && !isValidPhoneNumber(phone))
        newErrors.phone = 'Invalid phone number format';
    }

    if (currentStep === 2) {
      if (!street.trim()) newErrors.street = 'Street is required';
      if (!city.trim()) newErrors.city = 'City is required';
      if (!stateProv.trim()) newErrors.stateProv = 'State/Province is required';
      if (!zip.trim()) newErrors.zip = 'ZIP/Postal code is required';
      else if (!/^[A-Za-z0-9\s-]{3,10}$/.test(zip))
        newErrors.zip = 'Invalid ZIP/Postal code format';
      if (!country) newErrors.country = 'Country is required';
    }

    if (currentStep === 3) {
      if (!selectedFile) {
        newErrors.file = 'Please upload a document';
      } else {
        const validTypes = [
          'application/pdf',
          'image/jpeg',
          'image/png',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
        if (!validTypes.includes(selectedFile.type)) {
          newErrors.file = 'Allowed: PDF, JPG, PNG, DOC, DOCX';
        }
        if (selectedFile.size > 5 * 1024 * 1024) {
          newErrors.file = 'File must be under 5MB';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length) {
        setCurrentStep((prev) => prev + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const goBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPhone('');
    setStreet('');
    setCity('');
    setStateProv('');
    setZip('');
    setCountry('');
    setSelectedFile(null);
    setCurrentStep(1);
    setErrors({});
  };

  const handleSubmit = () => {
    const data = {
      title,
      description,
      phone,
      address: { street, city, stateProv, zip, country },
      file: selectedFile?.name || null,
    };
    console.log('Form submitted:', data);
    alert('Form submitted successfully!\nCheck console for data.');
    resetForm();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  return (
    <div className="min-h-screen from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-700 text-white px-8 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Student Registration Form</h1>
          <button
            onClick={resetForm}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-medium transition"
          >
            Reset Form
          </button>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4 bg-gray-50">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                    currentStep === step.id
                      ? 'bg-indigo-600 text-white scale-110 shadow-lg'
                      : currentStep > step.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step.id}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                
                  {step.title}
                </span>
              </div>

              {idx < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-4 rounded ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form Content */}
        <div className="px-8 py-10">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  placeholder="Your Full Name"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  placeholder="Tell us something about yourself..."
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <PhoneInput
                  international
                  defaultCountry="IN"
                  value={phone}
                  onChange={setPhone}
                  className={errors.phone ? 'PhoneInputInput--error' : ''}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.street ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                />
                {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    State/Province <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={stateProv}
                    onChange={(e) => setStateProv(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.stateProv ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.stateProv && <p className="text-red-500 text-sm mt-1">{errors.stateProv}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    ZIP/Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    maxLength={10}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.zip ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.country ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                    }`}
                  >
                    <option value="">Select country</option>
                    <option value="IN">India</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                  {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Upload Document <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileSelect}
                  className={`w-full px-4 py-3 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 ${
                    errors.file ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {selectedFile && (
                  <p className="mt-3 text-green-700 font-medium">
                    Selected: {selectedFile.name}
                  </p>
                )}
                {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
              </div>
              <p className="text-sm text-gray-500">
                Accepted formats: PDF, JPG, PNG, DOC, DOCX • Max size: 5MB
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="px-8 py-6 bg-gray-50 flex justify-between border-t">
          <button
            onClick={goBack}
            disabled={currentStep === 1}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition"
          >
            Previous
          </button>

          <button
            onClick={goNext}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            {currentStep === steps.length ? 'Submit Application' : 'Next Step'}
          </button>
        </div>
      </div>
    </div>
  );
}