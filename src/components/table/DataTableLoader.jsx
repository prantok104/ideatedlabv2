const DataTableLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        zIndex: 1,
      }}
    >
      <div
        style={{
          border: "4px solid #ccc",
          borderTop: "4px solid transparent",
          width: 20,
          height: 20,
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
    </div>
  );
};

export default DataTableLoader;
