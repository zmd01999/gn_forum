import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

export default class Md extends React.Component {

  state = {
      editorState: null
  }

  async componentDidMount () {
    // Assume here to get the editor content in html format from the server
    // const htmlContent = await fetchEditorContent()
    const htmlContent = "<h1></h1>"
    // Use BraftEditor.createEditorState to convert html strings to editorState data needed by the editor
    this.setState({
      editorState: BraftEditor.createEditorState(htmlContent)
    })
  }

  submitContent = async () => {
    // Pressing ctrl + s when the editor has focus will execute this method
    // Before the editor content is submitted to the server, you can directly call editorState.toHTML () to get the HTML content
    const htmlContent = this.state.editorState.toHTML()
    console.log(htmlContent)
    // const result = await saveEditorContent(htmlContent)
  }

  handleEditorChange = (editorState) => {
    console.log(editorState)
    this.setState({ editorState })
  }

  render () {

    const { editorState } = this.state

    return (
      <div className="my-component">
        <BraftEditor
          value={editorState}
          onChange={this.handleEditorChange}
          onSave={this.submitContent}
        />
      </div>
    )

  }

}