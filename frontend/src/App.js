import React, { useState } from "react";

import HomePage from "./HomePage";

import CustomerLogin from "./CustomerLogin";
import CustomerSignup from "./CustomerSignup";
import CustomerChat from "./CustomerChat";
import CustomerAIPage from "./CustomerAIPage";

import AgentLogin from "./AgentLogin";
import AgentSignup from "./AgentSignup";
import AgentDashboard from "./AgentDashboard";

function App() {

  const [role, setRole] = useState(null);

  const [customerLoggedIn, setCustomerLoggedIn] = useState(false);
  const [customerSignup, setCustomerSignup] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [showCustomerAI, setShowCustomerAI] = useState(false);

  const [agentLoggedIn, setAgentLoggedIn] = useState(false);
  const [agentSignup, setAgentSignup] = useState(false);

  // HOME PAGE
  if (!role) {
    return <HomePage setRole={setRole} />;
  }

  // ================= CUSTOMER =================

  if (role === "customer" && customerSignup) {
    return (
      <CustomerSignup
        setCustomerSignup={setCustomerSignup}
        setRole={setRole}
      />
    );
  }

  if (role === "customer" &&!showCustomerAI && !customerLoggedIn) {
    return (
      <CustomerLogin
        setCustomerLoggedIn={setCustomerLoggedIn}
        setCustomerEmail={setCustomerEmail}
        setShowCustomerSignup={setCustomerSignup}
        setRole={setRole}
        openAI={() => setShowCustomerAI(true)}
      />
    );
  }

  if (role === "customer" && customerLoggedIn) {
    return (
      <CustomerChat
        email={customerEmail}
        goBack={() => setCustomerLoggedIn(false)}
        logout={() => {
          setCustomerLoggedIn(false);
          setRole(null);
        }}
      />
    );
  }

  if (role === "customer" && showCustomerAI && !customerLoggedIn) {
  return (
    <CustomerAIPage
      email={customerEmail}
      openAgentChat={() => setCustomerLoggedIn(true)}
      logout={() => {
        setShowCustomerAI(false);
        setRole(null);
      }}
    />
  );
}

  // ================= AGENT =================

  if (role === "agent" && agentSignup) {
    return (
      <AgentSignup
        setAgentSignup={setAgentSignup}
        setRole={setRole}
      />
    );
  }

  if (role === "agent" && !agentLoggedIn) {
    return (
      <AgentLogin
        setAgentLoggedIn={setAgentLoggedIn}
        setShowAgentSignup={setAgentSignup}
        setRole={setRole}
      />
    );
  }

  if (role === "agent" && agentLoggedIn) {
    return (
      <AgentDashboard
        logout={() => {
          setAgentLoggedIn(false);
          setRole(null);
        }}
      />
    );
  }

}

export default App;