import React, { Component } from "react";
import "./IssueFilter.scss";
import Icon from "../Icon/Icon";
import { Row } from "../Row/Row";
import Button from "../Button/Button";

interface state {
    filterOptions: Array<string>;
    filterIcons: Array<string>;
    sortOptions: Array<string>;
    sortIcons: Array<string>;
    priorityFilterOptions: Array<string>;
    priorityFilterIcons: Array<string>;
    stateFilterOptions: Array<string>;
    stateFilterIcons: Array<string>;
    currentOptions: string;
}

export default class DashboardPage extends Component<unknown, state> {
    constructor(props) {
        super(props);
        this.state = {
            filterOptions: ["Estado", "Prioridad", "Usuario"],
            filterIcons: ["stateFilterIcon", "prioritySortIcon", "userFilterIcon"],
            sortOptions: ["Fecha", "Prioridad"],
            sortIcons: ["dateSortIcon", "prioritySortIcon"],
            priorityFilterOptions: ["Baja", "Media", "Alta"],
            priorityFilterIcons: ["lowPriorityFilterIcon", "mediumPriorityFilterIcon", "highPriorityFilterIcon"],
            stateFilterOptions: ["Pendiente", "Rechazada", "Aceptada", "En progreso", "Resuelta"],
            stateFilterIcons: [
                "pendienteFilterIcon",
                "rechazadaFilterIcon",
                "aceptadaFilterIcon",
                "progresoFilterIcon",
                "resueltoFilterIcon",
            ],
            currentOptions: "",
        };
    }

    render(): JSX.Element {
        const handleFilterClick = (btn) => {
            this.setState({ currentOptions: btn });
            const overlay = document.querySelector(".filter-overlay");
            overlay.classList.toggle("filter-overlay-active");
        };

        const handleFilterFilterClick = (f) => {
            const overlay = document.querySelector(".filter-overlay");
            overlay.classList.toggle("filter-overlay-active");
            this.setState({ currentOptions: f });
            overlay.classList.toggle("filter-overlay-active");
        };

        return (
            <Row className="btn-filter-container" gap={10} justifyContent="flex-end">
                <Button className="filter-btn" onClick={() => handleFilterClick("filter")} appearence="tertiary" size="sm">
                    <Icon icon="filterIcon" size="sm" className="filter-btn-icon" />
                    Filtrar
                </Button>
                <Button className="filter-btn" onClick={() => handleFilterClick("sort")} appearence="tertiary" size="sm">
                    <Icon icon="orderIcon" size="sm" className="filter-btn-icon" /> Ordenar
                </Button>
                <div className="filter-overlay">
                    <div className="filter-title">
                        {this.state.currentOptions === "filter"
                            ? "Filtrar por"
                            : this.state.currentOptions === "Prioridad"
                            ? "Filtrar por prioridad"
                            : this.state.currentOptions === "Estado"
                            ? "Filtrar por estado"
                            : "Ordenar por"}
                    </div>
                    {this.state.currentOptions === "filter"
                        ? this.state.filterOptions.map((option, index) => (
                              <div className="filter-option-container" key={option} onClick={() => handleFilterFilterClick(option)}>
                                  <Icon icon={this.state.filterIcons[index]} size="sm" className="filter-btn-icon"></Icon>
                                  {option}
                              </div>
                          ))
                        : this.state.currentOptions === "Prioridad"
                        ? this.state.priorityFilterOptions.map((option, index) => (
                              <div className="filter-option-container" key={option}>
                                  <Icon icon={this.state.priorityFilterIcons[index]} size="sm" className="filter-btn-icon"></Icon>
                                  {option}
                              </div>
                          ))
                        : this.state.currentOptions === "Estado"
                        ? this.state.stateFilterOptions.map((option, index) => (
                              <div className="filter-option-container" key={option}>
                                  <Icon icon={this.state.stateFilterIcons[index]} size="sm" className="filter-btn-icon"></Icon>
                                  {option}
                              </div>
                          ))
                        : this.state.sortOptions.map((option, index) => (
                              <div className="filter-option-container" key={option}>
                                  <Icon icon={this.state.sortIcons[index]} size="sm" className="filter-btn-icon"></Icon>
                                  {option}
                              </div>
                          ))}
                </div>
            </Row>
        );
    }
}
