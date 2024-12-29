import { STATUS_FAILED, STATUS_NO_RECORDS, STATUS_SUCCESS } from "../../constants/api-constants"

export class ApiResponse {
    status: number
    data: any
    message: string

    constructor({
        status = STATUS_FAILED,
        data = null,
        description = '',
    }) {
        this.status = status
        this.data = data
        this.message = status !== STATUS_SUCCESS && !description ? 'Unhandled api error' : description

    }

    get isSuccess() {
        return this.status === STATUS_SUCCESS
    }

    get showSuccesSnackBar() {
        return (!!(this.isSuccess && this.data && typeof this.data === 'string'))
    }

    get showErrorSnackbar() {
        return !this.isSuccess && this.message
    }
}
