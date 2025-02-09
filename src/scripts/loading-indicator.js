// Custom Element: <loading-indicator>
class LoadingIndicator extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          .loading-indicator {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }
          .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 2s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
        <div class="loading-indicator">
          <div class="spinner"></div>
        </div>
      `;
    }
  }
  
  customElements.define('loading-indicator', LoadingIndicator);
  
  const loadingIndicator = document.createElement('loading-indicator');
  document.body.appendChild(loadingIndicator);
  
  export function showLoadingIndicator() {
    loadingIndicator.style.display = 'flex';
  }
  
  export function hideLoadingIndicator() {
    loadingIndicator.style.display = 'none';
  }