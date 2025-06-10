
# imports the official Go image for building the app
FROM golang:1.23.3-alpine AS builder

# gets the necessary tools
RUN apk add --no-cache git curl

#sets the working repo in the container
WORKDIR /app

# copies go sum/mod files & dependencies
COPY go.mod go.sum ./ 
RUN go mod download

# copies the rest of the app code
COPY . .

# builds the Go binary
RUN go build -o main .

# starts a minimal final image
FROM alpine:latest

# sets working directory
WORKDIR /root/

#copies the compiled binary from the builder stage
COPY --from=builder /app/main .

# command to run the executable
CMD ["./main"]

