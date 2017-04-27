import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const PromptDialog = (props) => {
  const onAccept = props.onAccept;
  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children || props.content}
      </Modal.Body>
      <Modal.Footer>
        {
          props.buttons.map((button) => {
            let clickHandler = button.onClick;
            if (button.isAccept && onAccept) {
              clickHandler = onAccept;
            } else if (button.isCancel && !button.onClick) {
              clickHandler = props.close;
            }
            return (
              <Button bsStyle={button.style} onClick={clickHandler}>
                {button.text}
              </Button>
            );
          })
        }
      </Modal.Footer>
    </Modal>
  );
};

PromptDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.node,
  content: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isAccept: PropTypes.bool,
    isCancel: PropTypes.bool,
  })),
  onAccept: PropTypes.func,
};

PromptDialog.defaultProps = {
  title: 'Are you sure?',
  children: null,
  content: 'Are you sure you want to proceed?',
  buttons: [{
    text: 'Cancel',
    style: 'default',
    onClick: null,
    isCancel: true,
  }, {
    text: 'OK',
    style: 'success',
    onClick: null,
    isAccept: true,
  }],
  onAccept: null,
};

export default PromptDialog;
