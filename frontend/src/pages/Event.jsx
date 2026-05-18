import React from 'react';

const Event = ({ EventTitle, EventDate }) => {
  return (
    <div
      style={{
        display: 'flex',            // Positions circular icon and text side-by-side
        alignItems: 'center',       // Centers items vertically inside the wrapper card
        padding: '12px 16px',       // Provides clean breathing room around components
        width: '100%',              // Stretches fully to adapt to your right sidebar width
        backgroundColor: '#F1F5F9', // Soft light-gray card background tone
        borderRadius: '12px',       // Smooth rounded card corners
        boxSizing: 'border-box'
      }}
    >
      {/* Left Column: Dark Gray Circular Profile Icon Placeholder */}
      <div 
        style={{
          width: '36px',
          height: '36px',
          backgroundColor: '#4A5568', // Dark gray slate tone
          borderRadius: '50%',        // Perfect circle cut
          flexShrink: 0               // Prevents the circle from squishing
        }} 
      />

      {/* Right Column: Text Information Area */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',   // Stacks Title cleanly on top of Date
          alignItems: 'flex-start',  // Forces text properties to baseline to the left edge
          textAlign: 'left',         // Hard-locks text text alignment 
          paddingLeft: '12px',       // Horizontal separation from circular graphic
          flex: 1
        }}
      >
        {/* Event Title (Bold, Deep Black Title text) */}
        <span 
          style={{ 
            fontSize: '13px', 
            color: '#000000', 
            fontWeight: '700',
            lineHeight: '1.3',
            marginBottom: '2px',
            display: 'block'
          }}
        >
          {EventTitle || "Event Name"}
        </span>
        
        {/* Event Date / Time (Small, Muted Gray Description metadata) */}
        <span 
          style={{ 
            fontSize: '11px', 
            color: '#718096', 
            fontWeight: '500',
            display: 'block'
          }}
        >
          {EventDate || "Event Date | Event Time"}
        </span>
      </div>
    </div>
  );
};

export default Event;
