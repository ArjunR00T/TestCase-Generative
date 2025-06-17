import React, { useState } from 'react';
// import { Loader2, CheckCircle, ChevronDown, ChevronUp, TestTube2, Copy, Download, Save } from 'lucide-react';
import { Loader2, CheckCircle,TestTube2 } from 'lucide-react';

interface TestCase {
  id: string;
  title: string;
  steps: string[];
  expectedResult: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  category: string;
}

interface SimilarExample {
  userStory: string;
  testCases: TestCase[];
  project: string;
  date: string;
}

const TestCaseGenerator: React.FC = () => {
  const [userStory, setUserStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTestCases, setGeneratedTestCases] = useState<TestCase[]>([]);
  // const [showSimilarExamples, setShowSimilarExamples] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState("testCases");


  // const projects = [
  //   { id: 'ecommerce-platform', name: 'E-Commerce Platform' },
  //   { id: 'user-management', name: 'User Management System' },
  //   { id: 'payment-gateway', name: 'Payment Gateway' },
  //   { id: 'inventory-system', name: 'Inventory Management' }
  // ];

  // Mock similar examples data
  const similarExamples: SimilarExample[] = [
    {
      userStory: "As a registered user, I want to log into the application so that I can access my personal dashboard and account settings.",
      project: "User Management System",
      date: "2024-01-15",
      testCases: [
        {
          id: '1',
          title: 'Valid login with correct credentials',
          steps: [
            'Navigate to the login page',
            'Enter valid registered email address',
            'Enter correct password',
            'Click the "Sign In" button'
          ],
          expectedResult: 'User is successfully authenticated and redirected to the dashboard page',
          priority: 'Critical',
          category: 'Authentication'
        },
        {
          id: '2',
          title: 'Invalid login with incorrect password',
          steps: [
            'Navigate to the login page',
            'Enter valid registered email address',
            'Enter incorrect password',
            'Click the "Sign In" button'
          ],
          expectedResult: 'Error message "Invalid credentials" is displayed and user remains on login page',
          priority: 'High',
          category: 'Authentication'
        }
      ]
    },
    {
      userStory: "As a customer, I want to reset my password so that I can regain access to my account when I forget it.",
      project: "E-Commerce Platform",
      date: "2024-01-10",
      testCases: [
        {
          id: '3',
          title: 'Password reset with valid registered email',
          steps: [
            'Click "Forgot Password" link on login page',
            'Enter valid registered email address',
            'Click "Send Reset Link" button',
            'Check email inbox for reset link'
          ],
          expectedResult: 'Password reset email is sent successfully and confirmation message is displayed',
          priority: 'High',
          category: 'Authentication'
        }
      ]
    }
  ];

  const generateTestCases = async () => {
    if (!userStory.trim()) return;

    setIsLoading(true);
    setHasGenerated(false);

    // Simulate API call
    setTimeout(() => {
      const mockTestCases: TestCase[] = [
        {
          id: '1',
          title: 'Happy Path - Successful Feature Execution',
          steps: [
            'Navigate to the feature entry point',
            'Verify all required fields are displayed',
            'Enter valid test data in all required fields',
            'Click submit/execute button',
            'Verify successful completion message'
          ],
          expectedResult: 'Feature executes successfully, user achieves intended goal, and appropriate success feedback is provided',
          priority: 'Critical',
          category: 'Functional'
        },
        {
          id: '2',
          title: 'Input Validation - Invalid Data Handling',
          steps: [
            'Navigate to the feature entry point',
            'Enter invalid data in required fields (empty, special characters, exceeding limits)',
            'Attempt to submit the form',
            'Verify validation messages are displayed',
            'Confirm form submission is prevented'
          ],
          expectedResult: 'Clear validation error messages are displayed, form submission is blocked, and system remains stable',
          priority: 'High',
          category: 'Validation'
        },
        {
          id: '3',
          title: 'Authorization - Access Control Verification',
          steps: [
            'Login with user account having insufficient permissions',
            'Attempt to access the restricted feature',
            'Verify access denial response',
            'Check that no unauthorized actions can be performed'
          ],
          expectedResult: 'Access is properly denied with appropriate error message, user is redirected or blocked from unauthorized actions',
          priority: 'Critical',
          category: 'Security'
        },
        {
          id: '4',
          title: 'Performance - Load and Response Time',
          steps: [
            'Execute feature with maximum allowed data volume',
            'Monitor system response times',
            'Verify feature performance under normal load',
            'Check system stability during execution'
          ],
          expectedResult: 'Feature performs within acceptable response time limits (< 3 seconds), system remains stable under load',
          priority: 'Medium',
          category: 'Performance'
        },
        {
          id: '5',
          title: 'Error Handling - System Failure Recovery',
          steps: [
            'Simulate system interruption during feature execution',
            'Verify error handling mechanisms activate',
            'Check data integrity after interruption',
            'Verify system recovery capabilities'
          ],
          expectedResult: 'System gracefully handles errors, data integrity is maintained, appropriate error messages are shown, recovery is possible',
          priority: 'High',
          category: 'Error Handling'
        }
      ];

      setGeneratedTestCases(mockTestCases);
      setIsLoading(false);
      setHasGenerated(true);
    }, 3000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const copyTestCase = (testCase: TestCase) => {
    const text = `Test Case: ${testCase.title}\n\nSteps:\n${testCase.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}\n\nExpected Result:\n${testCase.expectedResult}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <TestTube2 className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Test Case Generator</h1>
        </div>
        <p className="text-gray-600">Generate comprehensive test cases from user stories using AI-powered analysis</p>
      </div>



      {/* Main Input Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <label htmlFor="userStory" className="block text-sm font-semibold text-gray-700 mb-3">
          User Story Input
        </label>
        <textarea
          id="userStory"
          value={userStory}
          onChange={(e) => setUserStory(e.target.value)}
          className="w-full h-32 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500 bg-white"
          placeholder="Input user story...."
        />

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            {userStory.length}/500 characters
          </div>
          <button
            onClick={generateTestCases}
            disabled={!userStory.trim() || isLoading}
            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <TestTube2 className="h-4 w-4" />
                <span>Generate Test Cases</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Test Cases */}
      {(isLoading || hasGenerated) && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Generated Test Cases</span>
            </h2>
            {/* {hasGenerated && (
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200">
                  <Save className="h-4 w-4" />
                  <span>Save to Project</span>
                </button>
              </div>
            )} */}
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                <p className="text-gray-600">AI is analyzing your user story and generating comprehensive test cases...</p>
                <div className="w-64 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex space-x-4 border-b mb-6">
              <button
                className={`pb-2 px-4 font-medium ${activeTab === "testCases" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-blue-600"}`}
                onClick={() => setActiveTab("testCases")}
              >
                Generated Test Cases
              </button>
              <button
                className={`pb-2 px-4 font-medium ${activeTab === "references" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-blue-600"}`}
                onClick={() => setActiveTab("references")}
              >
                Referenced From
              </button>
            </div>

          )}

          {activeTab === "testCases" && (
            <div className="space-y-4">
              {generatedTestCases.map((testCase) => (
                <div key={testCase.id} className="bg-white p-4 rounded-md border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">{testCase.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(testCase.priority)}`}>
                        {testCase.priority}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                        {testCase.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{testCase.expectedResult}</p>
                  <button
                    onClick={() => copyTestCase(testCase)}
                    className="mt-2 text-sm text-blue-600 hover:underline"
                  >
                    Copy Test Case
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "references" && (
            <div className="space-y-4">
              {similarExamples.map((example, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-gray-700">User Story:</h3>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{example.project}</span>
                        <span>•</span>
                        <span>{example.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic bg-blue-50 p-3 rounded-md border border-blue-200">
                      "{example.userStory}"
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Generated Test Cases:</h3>
                    <div className="space-y-3">
                      {example.testCases.map((testCase) => (
                        <div key={testCase.id} className="bg-white p-4 rounded-md border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium text-gray-900">{testCase.title}</h4>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(testCase.priority)}`}>
                                {testCase.priority}
                              </span>
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                                {testCase.category}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600">{testCase.expectedResult}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}


      {/* <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style> */}
    </div>
  );
};

export default TestCaseGenerator;