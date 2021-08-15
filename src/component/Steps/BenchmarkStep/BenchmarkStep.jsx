import React from "react";
import "./BenchmarkStep.scss";
import SettingsColor from "./SettingsColor.jsx";

const BenchmarkStep = () => {
  return (
    <div className="settings-field-container">
      <div className="settings-multiple-wrapper">
        <div className="settings-multiple-item-list">
          <div className="item-list-item">
            <div className="settings-field-component item-list-item-field">
              <div className="settings-field-component benchmark-line-value">
                <div className="settings-field-title-wrapper">
                  <div className="settings-field-title">
                    <div>Benchmark Line</div>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Number Value"
                  className="input"
                />
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
            <div className="item-list-item-actions"></div>
          </div>
        </div>
        <div className="settings-multiple-item-footer"></div>
      </div>
    </div>
  );
};

export default BenchmarkStep;
