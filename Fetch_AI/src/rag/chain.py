def create_rag_chain(file_path: str = "data/raw/apple_10k.pdf"):
    """Create RAG chain for SEC filing analysis."""
    # Initialize document processing
    loader = DocumentLoader(file_path)
    chunks = loader.load_and_split()
    
    # Set up vector store
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
    vectorstore = Qdrant.from_documents(
        chunks,
        embeddings,
        location=":memory:",
        collection_name="sec_filings"
    )
    
    # Create retrieval chain
    template = """Use the context to answer financial questions.
    Context: {context}
    Question: {question}
    Answer with specific numbers and data when available."""
    
    prompt = ChatPromptTemplate.from_template(template)
    chain = (
        {"context": vectorstore.as_retriever(), "question": RunnablePassthrough()}
        | prompt
        | ChatOpenAI(model="gpt-4-turbo-preview")
        | StrOutputParser()
    )
    
    return chain