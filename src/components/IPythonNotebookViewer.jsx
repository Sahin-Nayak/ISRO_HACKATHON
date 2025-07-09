import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IPythonNotebookViewer = () => {
  const [notebookData, setNotebookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCell, setActiveCell] = useState(0);

  useEffect(() => {
    const fetchNotebook = async () => {
      try {
        const response = await fetch('/AQI_Monitoring_python_file.ipynb');
        if (!response.ok) {
          throw new Error('Failed to load notebook file');
        }
        const data = await response.json();
        setNotebookData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotebook();
  }, []);

  const renderCell = (cell, index) => {
    if (cell.cell_type === 'code') {
      return (
        <motion.div 
          key={index}
          className="code-cell"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => setActiveCell(index)}
        >
          <div className="cell-header">
            <span className="cell-type">Code Cell {index + 1}</span>
            <span className="execution-count">In [{cell.execution_count || ' '}]:</span>
          </div>
          <pre className="code-content">{cell.source.join('')}</pre>
          {cell.outputs && cell.outputs.length > 0 && (
            <div className="code-output">
              {cell.outputs.map((output, i) => (
                <div key={i} className="output-item">
                  {output.data && output.data['text/plain'] ? (
                    <pre>{output.data['text/plain'].join('\n')}</pre>
                  ) : output.text ? (
                    <pre>{output.text.join('\n')}</pre>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      );
    } else if (cell.cell_type === 'markdown') {
      return (
        <motion.div 
          key={index}
          className="markdown-cell"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => setActiveCell(index)}
        >
          <div className="cell-header">
            <span className="cell-type">Markdown Cell {index + 1}</span>
          </div>
          <div className="markdown-content">
            {cell.source.join('').split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="notebook-viewer">
      <AnimatePresence>
        {loading && (
          <motion.div
            className="loading-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="spinner"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <p>Loading Jupyter Notebook...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.div 
          className="error-card"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="error-icon">⚠️</div>
          <div className="error-text">{error}</div>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </motion.div>
      )}

      {notebookData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="notebook-container"
        >
          <div className="notebook-header">
            <h1>{notebookData.metadata.kernelspec?.display_name || 'Python Notebook'}</h1>
            <p className="notebook-name">AQI_Monitoring_python_file.ipynb</p>
          </div>

          <div className="cells-container">
            {notebookData.cells.map((cell, index) => (
              <div 
                key={index} 
                className={`cell-wrapper ${activeCell === index ? 'active' : ''}`}
              >
                {renderCell(cell, index)}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <style jsx>{`
        .notebook-viewer {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f5f5f5;
          min-height: 100vh;
          padding: 20px;
        }

        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(66, 153, 225, 0.2);
          border-top-color: #4299e1;
          border-radius: 50%;
          margin-bottom: 20px;
        }

        .error-card {
          background-color: #fff5f5;
          color: #c53030;
          padding: 15px 20px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .error-icon {
          font-size: 1.5rem;
        }

        .error-text {
          flex: 1;
          font-weight: 500;
        }

        .retry-button {
          background-color: #feb2b2;
          color: #c53030;
          border: none;
          border-radius: 4px;
          padding: 8px 15px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .retry-button:hover {
          background-color: #fc8181;
        }

        .notebook-container {
          max-width: 1000px;
          margin: 0 auto;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .notebook-header {
          background: #4285f4;
          color: white;
          padding: 20px;
          border-bottom: 1px solid #e0e0e0;
        }

        .notebook-header h1 {
          margin: 0;
          font-size: 1.8rem;
        }

        .notebook-name {
          margin: 5px 0 0;
          opacity: 0.9;
          font-size: 0.9rem;
        }

        .cells-container {
          padding: 15px;
        }

        .cell-wrapper {
          margin-bottom: 20px;
          border-radius: 6px;
          overflow: hidden;
          transition: all 0.2s;
        }

        .cell-wrapper.active {
          box-shadow: 0 0 0 2px #4285f4;
        }

        .code-cell {
          background: #f8f9fa;
          border-left: 4px solid #4285f4;
          padding: 10px;
          cursor: pointer;
        }

        .markdown-cell {
          background: #f8f9fa;
          border-left: 4px solid #34a853;
          padding: 10px;
          cursor: pointer;
        }

        .cell-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 0.8rem;
          color: #666;
        }

        .cell-type {
          font-weight: 600;
        }

        .execution-count {
          color: #666;
          font-style: italic;
        }

        .code-content {
          background: #f1f3f4;
          padding: 10px;
          border-radius: 4px;
          font-family: 'Courier New', Courier, monospace;
          white-space: pre-wrap;
          margin: 0;
          font-size: 0.9rem;
        }

        .code-output {
          background: #e8f0fe;
          padding: 10px;
          border-radius: 4px;
          margin-top: 10px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.9rem;
        }

        .output-item {
          margin-bottom: 5px;
        }

        .output-item:last-child {
          margin-bottom: 0;
        }

        .markdown-content {
          padding: 5px;
          line-height: 1.5;
        }

        .markdown-content p {
          margin: 0 0 10px 0;
        }

        .markdown-content p:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .notebook-header h1 {
            font-size: 1.5rem;
          }

          .code-content, .code-output {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .notebook-viewer {
            padding: 10px;
          }

          .notebook-container {
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default IPythonNotebookViewer;