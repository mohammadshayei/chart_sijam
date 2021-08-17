import React from "react";
import SettingsColor from "./SettingsColor.jsx";
import { MdCancel } from "react-icons/md";

const BenchmarkLine = (props) => {
  return (
    <div key={props.propKey} className="item-list-item">
      <div className="settings-field-component item-list-item-field">
        <div className="settings-field-component benchmark-line-value">
          <div className="settings-field-title-wrapper">
            <div className="settings-field-title">
              <div>Benchmark Line</div>
            </div>
          </div>
          <input type="text" placeholder="Number Value" className="input" />
        </div>
        <div className="settings-field-component benchmark-line-label">
          <input
            type="text"
            placeholder="Benchmark Line Label"
            className="input"
          />
        </div>
        <div className="settings-field-component">
          <SettingsColor />
        </div>
      </div>
      {props.index !== "0" && (
        <div className="item-list-item-actions">
          <button
            className="sijam-style-button"
            onClick={() => props.onRemove(props.index)}
          >
            <MdCancel />
          </button>
        </div>
      )}
    </div>
  );
};

export default BenchmarkLine;
