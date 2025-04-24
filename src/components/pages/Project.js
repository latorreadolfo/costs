import styles from './Project.module.css';

import { parse, v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ServiceCard from '../service/ServiceCard';
import ServiceForm from '../service/ServiceForm';
import ProjectForm from '../project/ProjectForm';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import Message from '../layout/Message';

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
          setServices(data.services);
        })
        .catch((err) => console.log(err));
    }, 2000);
  }, [id]);

  function editPost(project) {
    setMessage('');
    // budget < cost validation
    if (project.budget < project.cost) {
      setMessage('The cost cannot exceed budget');
      setType('error');
      return false;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage('Project Updated!');
        setType('success');
        //message
      })
      .catch((err) => console.log(err));
  }

  function createService(project) {
    setMessage('');
    // last service
    const lastService = project.services[project.services.length - 1];

    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    //maximum value validation

    if (newCost > parseFloat(project.budget)) {
      setMessage('Budget override, please verify the service cost');
      setType('error');
      project.services.pop();
      return false;
    }

    //add service cost to project total cost
    project.cost = newCost;

    // update project
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        //show services
        setShowServiceForm(false);
      })
      .catch((err) => console.log(err));
  }

  function removeService(id, cost) {
    setMessage('');

    const servicesUpdated = project.services.filter(
      (service) => service.id !== id
    );

    const projectUpdated = project;

    projectUpdated.services = servicesUpdated;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(projectUpdated);
        setServices(servicesUpdated);
        setMessage('Service removed successfully!');
        setType('success');
      })
      .catch((err) => console.log(err));
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass='column'>
            {message && (
              <Message
                type={type}
                msg={message}
              />
            )}
            <div className={styles.details_container}>
              <h1> Project: {project.name} </h1>
              <button
                className={styles.btn}
                onClick={toggleProjectForm}
              >
                {' '}
                {!showProjectForm ? 'Edit Project' : 'Close'}{' '}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Category:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total Budget:</span> USD{' '}
                    <span style={{ color: '#27ae60' }}>
                      $
                      {Number(project.budget).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                  <p>
                    <span>Total Cost:</span> USD{' '}
                    <span style={{ color: '#e74c3c' }}>
                      $
                      {project.cost.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText='Finish Editing'
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Add Services</h2>
              <button
                className={styles.btn}
                onClick={toggleServiceForm}
              >
                {!showServiceForm ? 'Add Service' : 'Close'}{' '}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText='Add Service'
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Services</h2>
            <Container customClass='start'>
              {services.length > 0 &&
                services
                  .slice()
                  .reverse()
                  .map((service) => (
                    <ServiceCard
                      id={service.id}
                      name={service.name}
                      cost={service.cost}
                      description={service.description}
                      key={service.key}
                      handleRemove={removeService}
                    />
                  ))}
              {services.length === 0 && <p>No services to show.</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
