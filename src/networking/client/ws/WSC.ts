type SendMessage  = (data: string | BufferSource | Blob) => void

type WSCOptions = {
  pingInterval: number
  pongWait: number
}

type WSCHandlers = {
  onOpen: (e: Event) => void
  onClose: (e: CloseEvent) => void
  onMessage: (e: MessageEvent) => void
  onError: (e: Event) => void
}

interface IWSC {
  close: () => void
  isClosed: () => boolean
  sendMessage: SendMessage
}

class WSC implements IWSC {
  constructor(uri: string | URL, options: WSCOptions, handlers: WSCHandlers) {
    this.ws = new WebSocket(uri)
    // this.options = { ...options }
    this.handlers = { ...handlers }

    this.attachListeners()
  }

  private ws: WebSocket
  // private options: WSCOptions
  private handlers: WSCHandlers
  // private pingIntervalId: number | undefined
  private closed = false

  private onOpen = (e: Event) => {
    this.handlers.onOpen(e)
  }

  private onClose = (e: CloseEvent) => {
    this.handleClose()
    this.handlers.onClose(e)
  }

  private onMessage = (e: MessageEvent) => {
    this.handlers.onMessage(e)
  }

  private onError = (e: Event) => {
    this.handlers.onError(e)
  }

  private attachListeners = () => {
    this.ws.addEventListener("open", this.onOpen)
    this.ws.addEventListener("close", this.onClose)
    this.ws.addEventListener("message", this.onMessage)
    this.ws.addEventListener("error", this.onError)
  }

  private handleClose = () => {
    this.ws.removeEventListener("open", this.onOpen)
    this.ws.removeEventListener("close", this.onClose)
    this.ws.removeEventListener("message", this.onMessage)
    this.ws.removeEventListener("error", this.onError)
    this.closed = true
  }

  public close = () => {
    this.ws.close()
  }

  public isClosed = () => this.closed

  public sendMessage: SendMessage = (data) => {
    this.ws.send(data)
  }
}

export default WSC