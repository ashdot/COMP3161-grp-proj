import React from 'react';

// Added onSelect prop callback to handle direct routing when the box boundary is clicked
const Course = ({ CourseCode, CourseName, onSelect }) => {
  return (
    // Cleaned up the extra outer spacing <div> container to make sure clicking inside the card bounds works perfectly
    <div
      onClick={onSelect} // Click event is tied directly to the card container
      style={{
        display: 'flex',          
        alignItems: 'center',      
        height: '100px',            
        width: '100%',            
        border: '1px solid #F1F5F9', 
        borderRadius: '6px',       
        overflow: 'hidden',        
        backgroundColor: '#ffffff',
        cursor: 'pointer',          // Changes cursor to pointer hand icon on hover
        userSelect: 'none',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        transition: 'all 0.15s ease-in-out' // Smooth color transition engine
      }}
      // Interactive hover effects handled without extra global CSS sheets
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#FAFAFA'; // Subtle warm tint background fill
        e.currentTarget.style.borderColor = '#CBD5E1';     // Darkens border lines on focus
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#ffffff'; // Returns to clean white
        e.currentTarget.style.borderColor = '#F1F5F9';     // Resets border lines
        e.currentTarget.style.transform = 'none';
      }}
    >
      {/* Left Column: Light Gray Square Image Placeholder */}
      <div 
        style={{
          width: '85px',
          height: '100%',
          // backgroundColor: '#F8FAFC', 
          backgroundColor: '#E0E7FF', 
          flexShrink: 0
        }} 
      />

      {/* Right Column: Text Information Area */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'flex-start', // Forces all dynamic child text elements to align strictly to the left edge
          textAlign: 'left',        // Ensures text lines flow left-aligned
          paddingLeft: '14px',     
          flex: 1
        }}
      >
        {/* Course Code (Aligned Left) */}
        <span 
          style={{ 
            fontSize: '11px', 
            color: '#94A3B8',      
            fontWeight: '600',
            marginBottom: '1px',
            letterSpacing: '-0.1px',
            display: 'block'
          }}
        >
          {CourseCode || "Course Code"}
        </span>
        
        {/* Course Name (Aligned Left) */}
        <span 
          style={{ 
            fontSize: '14px', 
            color: '#000000',      
            fontWeight: '700',
            letterSpacing: '-0.3px',
            display: 'block'
          }}
        >
          {CourseName || "Course Name"}
        </span>
      </div>
    </div>
  );
};

export default Course;
