FROM public.ecr.aws/bitnami/golang:1.16 as build-image

# Certificate Fix
RUN apt-get update && apt-get install -y ca-certificates openssl
ARG cert_location=/usr/local/share/ca-certificates
# Get certificate from "github.com"
RUN openssl s_client -showcerts -connect github.com:443 </dev/null 2>/dev/null|openssl x509 -outform PEM > ${cert_location}/github.crt
# Get certificate from "proxy.golang.org"
RUN openssl s_client -showcerts -connect proxy.golang.org:443 </dev/null 2>/dev/null|openssl x509 -outform PEM >  ${cert_location}/proxy.golang.crt
# Update certificates
RUN update-ca-certificates

WORKDIR /go/src
COPY go.mod go.sum *.go ./

RUN go build -o ../bin

FROM public.ecr.aws/lambda/go:1

COPY --from=build-image /go/bin/ /var/task/

# Command can be overwritten by providing a different command in the template directly.
CMD ["wmetric"]
