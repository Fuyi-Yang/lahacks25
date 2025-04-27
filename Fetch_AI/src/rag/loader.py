class DocumentLoader:
    def __init__(self, file_path: str):
        self.file_path = file_path
    
    @staticmethod
    def tiktoken_len(text):
        tokens = tiktoken.encoding_for_model("gpt-4").encode(text)
        return len(tokens)
    
    def load_and_split(self):
        """Load and chunk documents for processing."""
        docs = PyMuPDFLoader(self.file_path).load()
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=300,
            chunk_overlap=0,
            length_function=self.tiktoken_len
        )
        return splitter.split_documents(docs)